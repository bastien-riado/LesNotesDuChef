import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import log from '../Log';
import {Recipe} from '../models/RecipeModels';
import {dbRef} from '../services/Auth/config/FirebaseConfig';

export async function postNewRecipe(recipe: Recipe): Promise<string | null> {
  if (
    !recipe ||
    !recipe.name ||
    !recipe.description ||
    !recipe.difficulty ||
    !recipe.time
  ) {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs du formulaire.');
    return null;
  }

  const recipesRef = dbRef.ref('recipes');
  try {
    const newRecipeRef = recipesRef.push();
    const recipeId = newRecipeRef.key;
    if (!recipeId) {
      console.error("L'ID généré par Firebase est null.");
      return null;
    }

    await newRecipeRef.update({
      ...recipe,
      id: recipeId,
      ownerId: auth().currentUser!.uid,
    });
    return recipeId;
  } catch (error) {
    Alert.alert("Quelque chose s'est mal passé, veuillez réessayer!");
    log.error("Erreur lors de l'envoi des données à Firebase:", error);
    return null;
  }
}

export async function deleteRecipe(recipe: Recipe): Promise<void> {
  if (recipe.id) {
    dbRef.ref('recipes').child(recipe.id).remove();
  }
}

export async function getRecipes(): Promise<Recipe[] | null> {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      return null;
    }

    const data = await dbRef
      .ref('recipes')
      .orderByChild('ownerId')
      .equalTo(userId)
      .once('value')
      .then((t) => t.val())
      .catch(console.error);

    if (!data) {
      return null;
    }

    return Object.keys(data).map(
      (recipeId) =>
        ({
          id: recipeId,
          ...data[recipeId],
        } as Recipe),
    );
  } catch (error) {
    Alert.alert("Quelque chose s'est mal passé, veuillez réessayer!");
    log.error('Erreur lors de la récupération des données de Firebase:', error);
    return null;
  }
}
