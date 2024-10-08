import { Recipe } from '../../models/RecipeModels';
import {
  deleteRecipe,
  deleteRecipes,
  getRecipes,
  postNewRecipe,
  updateRecipe,
} from '../../services/RecipeService';
import { updateCurrentRecipe } from '../recipe/actions';

import {
  addRecipe,
  isInDeleteSelectionMode,
  removeRecipe,
  removeRecipesSelected,
  updateRecipe as updateRecipeAction,
} from './actions';

import Toast from 'react-native-toast-message';
import { AppDispatch } from '../store';

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

export const addRecipeThunk = (recipe: Recipe, t: (Key: string) => string) => {
  return async (dispatch: AppDispatch): Promise<boolean> => {
    if (
      !recipe ||
      !recipe.name ||
      !recipe.description ||
      !recipe.difficulty ||
      !recipe.time
    ) {
      Toast.show({ type: 'error', text1: t('NewRecipe.Error.EmptyFields') });
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
      Toast.show({ type: 'error', text1: t('NewRecipe.Error.AddRecipe') });
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

export const removeRecipesSelectedThunk = (recipes: Recipe[]) => {
  return async (dispatch: AppDispatch) => {
    await deleteRecipes(recipes);
    dispatch(removeRecipesSelected());
    dispatch(isInDeleteSelectionMode(false));
  };
};
