import { Alert } from "react-native";
import { Recipe, RecipeStep } from "../models/RecipeModels";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import AuthService from "./AuthService";

function showModalError(title: string, message?: string): void {
    Alert.alert(title, message ?? 'Pas de détails disponibles');
}

const recipeConverter = {
    toFirestore: (recipe?: Recipe): FirebaseFirestoreTypes.DocumentData => {
        return {
            ...recipe,
            ownerId: AuthService.getUserId()
        };
    },

    fromFirestore: (snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> |
        FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>): Recipe => {

        try {
            const recipe = snapshot.data() as Recipe;
            return recipe;
        } catch {
            showModalError('Firestore data is inconsistent for Recipe');
            throw new Error(`Firestore data is inconsistent for Recipe. Data recieved:\n${snapshot}`);
        }
    }
};

const stepsConverter = {
    toFirestore: (steps: RecipeStep): FirebaseFirestoreTypes.DocumentData => {
        return steps;
    },

    fromFirestore: (snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> |
        FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>): RecipeStep => {

        try {
            const recipeStep = snapshot.data() as RecipeStep;
            return recipeStep;
        } catch {
            showModalError('Firestore data is inconsistent for the Step of Recipe');
            throw new Error(`Firestore data is inconsistent for RecipeStep. Data recieved:\n${snapshot}`);
        }
    }
};

const RecipeService = {
    postNewRecipe: async (recipe: Recipe): Promise<void> => {
        if (!recipe || !recipe.title || !recipe.steps || !recipe.difficulty || !recipe.time) {
            showModalError('Veuillez Remplir tous les champs du formulaire',
                'Le nom, la difficulté et le temps de préparation sont obligatoires. La recette nécessite au moins une étape.');
            throw new Error('Inccorect Recipe Formatting');
        }

        const batch = firestore().batch();

        const newRecipeDocRef = firestore().collection('recipes').doc(''); // NON
        batch.set(newRecipeDocRef, recipeConverter.toFirestore(recipe));

        //TODO: find how to use this
        const newStepsRef = await firestore().collection('recipes').doc(recipe.id).collection('steps').get();

        recipe.steps.forEach(step => batch.set(newStepsRef, stepsConverter.toFirestore(step)))

        return batch.commit().catch(error => {
            showModalError('Could not create the recipe', error)
            throw error;
        });
    },

    deleteRecipe: async (recipe: Recipe): Promise<void> => {
        if (recipe.id) {
            const batch = firestore().batch();

            const steps = await firestore().collection('recipe').doc(recipe.id).collection('steps').get();
            steps.forEach(step => batch.delete(step.ref));
            batch.delete(firestore().collection('recipe').doc(recipe.id));
            return batch.commit().catch(error => {
                showModalError('Could not delete the recipe');
                throw error;
            });
        }
    },

    getRecipes: async (lastRecipe?: Recipe): Promise<Recipe[] | null> => {
        const querySnapshot = await firestore().collection('recipes')
            .where('ownerId', '==', AuthService.getUserId())
            .limit(10)
            .startAt(recipeConverter.toFirestore(lastRecipe))
            .get()
            .catch(error => {
                showModalError('Erreur lors de la récupération des recettes', error);
                throw error;
            });

        return querySnapshot.docs.map(recipeConverter.fromFirestore);
    },

    getRecipeSteps: async (recipeId: string): Promise<RecipeStep[] | null> => {
        const querySnapshot = await firestore().collection('recipes').doc(recipeId).collection('steps')
            .orderBy('index', 'asc')
            .get()
            .catch(error => {
                showModalError(`Erreur lors de la récupération des étapes de recettes`, error);
                throw error;
            });

        return querySnapshot.docs.map(stepsConverter.fromFirestore);
    }
}

export default RecipeService;
