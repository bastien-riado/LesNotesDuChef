import { Alert } from 'react-native';
import { Recipe } from '../../models/RecipeModels';
import {
  deleteRecipe,
  getRecipes,
  postNewRecipe,
  updateRecipe,
} from '../../services/RecipeService';
import { updateCurrentRecipe } from '../recipe/actions';
import { AppDispatch } from '../store';
import { addRecipe, removeRecipe, updateRecipe as updateRecipeAction } from './actions';

export const fetchRecipesThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const recipes: Recipe[] = (await getRecipes()) as Recipe[];
      if (!recipes) {
        return;
      }
      recipes.forEach((recipe) => {
        dispatch(addRecipe(recipe, recipe.id));
      });
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  };
};

export const addRecipeThunk = (recipe: Recipe) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    if (
      !recipe ||
      !recipe.name ||
      !recipe.description ||
      !recipe.difficulty ||
      !recipe.time
    ) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs du formulaire.');
      return false;
    }
    try {
      const recipeId = await postNewRecipe(recipe);
      if (recipeId) {
        dispatch(addRecipe(recipe, recipeId));
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
};

export const updateRecipeThunk = (recipe: Recipe) => {
  return async (dispatch: AppDispatch) => {
    await updateRecipe(recipe);
    dispatch(updateRecipeAction(recipe));
    dispatch(updateCurrentRecipe(recipe));
  };
};

export const removeRecipeThunk = (recipe: Recipe) => {
  return async (dispatch: AppDispatch) => {
    await deleteRecipe(recipe);
    dispatch(removeRecipe(recipe));
  };
};
