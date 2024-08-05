import auth from '@react-native-firebase/auth';
import { Recipe } from '../models/RecipeModels';
import { dbRef } from '../services/Auth/config/FirebaseConfig';

export async function postNewRecipe(recipe: Recipe): Promise<string | null> {
  const user = auth().currentUser;
  if (!user) {
    console.error('User is not authenticated.');
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
      ownerId: user.uid,
    });
    return recipeId;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données à Firebase:", error);
    return null;
  }
}

export async function deleteRecipe(recipe: Recipe): Promise<void> {
  if (recipe.id) {
    try {
      await dbRef.ref('recipes').child(recipe.id).remove();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  } else {
    console.error('Recipe ID is not provided.');
  }
}

export async function updateRecipe(recipe: Recipe): Promise<void> {
  if (recipe.id) {
    try {
      await dbRef.ref('recipes').child(recipe.id).update({
        name: recipe.name,
        description: recipe.description,
        time: recipe.time,
        difficulty: recipe.difficulty,
        image: recipe.image,
      });
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  } else {
    console.error('Recipe ID is not provided.');
  }
}

export async function updateRecipeImage(
  recipeId: string,
  downloadUrl: string,
): Promise<void> {
  console.log('updateRecipeImage', recipeId, downloadUrl);
  if (recipeId) {
    try {
      await dbRef.ref(`recipes/${recipeId}`).update({
        image: downloadUrl,
      });
      console.log('Image updated in Firebase');
    } catch (error) {
      console.error('Error updating image in Firebase:', error);
      throw error;
    }
  }
}

export async function deleteRecipes(recipes: Recipe[]): Promise<void> {
  try {
    await Promise.all(recipes.map((recipe) => deleteRecipe(recipe)));
  } catch (error) {
    console.error('Error deleting multiple recipes:', error);
    throw error;
  }
}

export async function getRecipes(): Promise<Recipe[] | null> {
  const user = auth().currentUser;
  if (!user) {
    console.error('User is not authenticated.');
    return null;
  }
  try {
    const snapshot = await dbRef
      .ref('recipes')
      .orderByChild('ownerId')
      .equalTo(user.uid)
      .once('value');

    const data = snapshot.val();
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
