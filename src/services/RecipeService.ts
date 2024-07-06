import auth from '@react-native-firebase/auth';
import { Recipe } from '../models/RecipeModels';
import { dbRef } from '../services/Auth/config/FirebaseConfig';

export async function postNewRecipe(recipe: Recipe): Promise<string | null> {
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
    console.error("Erreur lors de l'envoi des données à Firebase:", error);
    return null;
  }
}

export async function deleteRecipe(recipe: Recipe): Promise<void> {
  if (recipe.id) {
    dbRef.ref('recipes').child(recipe.id).remove();
  }
}

export async function updateRecipe(recipe: Recipe): Promise<void> {
  if (recipe.id) {
    dbRef.ref('recipes').child(recipe.id).update({
      name: recipe.name,
      description: recipe.description,
      time: recipe.time,
      difficulty: recipe.difficulty,
    });
  }
}

export async function deleteRecipes(recipes: Recipe[]): Promise<void> {
  recipes.forEach((recipe) => {
    deleteRecipe(recipe);
  });
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
        }) as Recipe,
    );
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    return null;
  }
}
