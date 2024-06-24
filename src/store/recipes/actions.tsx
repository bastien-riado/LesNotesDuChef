import { Recipe } from '../../models/RecipeModels';

export type RecipesAction = GetRecipesAction | AddRecipeAction | RemoveRecipeAction;

export interface GetRecipesAction {
  type: 'GET_RECIPES';
}

export interface AddRecipeAction {
  type: 'ADD_RECIPE';
  payload: Recipe;
}

export interface RemoveRecipeAction {
  type: 'REMOVE_RECIPE';
  payload: Recipe;
}

export const getRecipes = (): GetRecipesAction => {
  return {
    type: 'GET_RECIPES',
  };
};

export const addRecipe = (recipe: Recipe): AddRecipeAction => {
  return {
    type: 'ADD_RECIPE',
    payload: recipe,
  };
};

export const removeRecipe = (recipe: Recipe): RemoveRecipeAction => {
  return {
    type: 'REMOVE_RECIPE',
    payload: recipe,
  };
};
