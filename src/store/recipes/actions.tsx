import { Recipe } from '../../models/RecipeModels';

export type RecipesAction =
  | GetRecipesAction
  | AddRecipeAction
  | UpdateRecipeAction
  | RemoveRecipeAction
  | RemoveRecipesAction;

export interface GetRecipesAction {
  type: 'GET_RECIPES';
}

export interface AddRecipeAction {
  type: 'ADD_RECIPE';
  payload: Recipe;
}

export interface UpdateRecipeAction {
  type: 'UPDATE_RECIPE';
  payload: Recipe;
}

export interface RemoveRecipeAction {
  type: 'REMOVE_RECIPE';
  payload: Recipe;
}

export interface RemoveRecipesAction {
  type: 'REMOVE_RECIPES';
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getRecipes = (): GetRecipesAction => {
  return {
    type: 'GET_RECIPES',
  };
};

export const addRecipe = (
  recipe: Recipe,
  recipeId: string | undefined,
): AddRecipeAction => {
  return {
    type: 'ADD_RECIPE',
    payload: { ...recipe, id: recipeId },
  };
};

export const updateRecipe = (recipe: Recipe): UpdateRecipeAction => {
  return {
    type: 'UPDATE_RECIPE',
    payload: recipe,
  };
};

export const removeRecipe = (recipe: Recipe): RemoveRecipeAction => {
  return {
    type: 'REMOVE_RECIPE',
    payload: recipe,
  };
};

export const removeRecipes = (): RemoveRecipesAction => {
  return {
    type: 'REMOVE_RECIPES',
  };
};
