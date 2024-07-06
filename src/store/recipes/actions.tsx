import { Recipe } from '../../models/RecipeModels';

export type RecipesAction =
  | GetRecipesAction
  | AddRecipeAction
  | UpdateRecipeAction
  | RemoveRecipeAction
  | RemoveRecipesAction
  | RemoveRecipesSelectedAction
  | IsInDeleteSelectionMode
  | AddToDeleteSelection
  | RemoveFromDeleteSelection
  | ClearDeleteSelection;

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

export interface RemoveRecipesSelectedAction {
  type: 'REMOVE_RECIPES_SELECTED';
}

export interface IsInDeleteSelectionMode {
  type: 'IS_IN_DELETE_SELECTION_MODE';
  payload: boolean;
}

export interface AddToDeleteSelection {
  type: 'ADD_TO_DELETE_SELECTION';
  payload: Recipe;
}

export interface RemoveFromDeleteSelection {
  type: 'REMOVE_FROM_DELETE_SELECTION';
  payload: Recipe;
}

export interface ClearDeleteSelection {
  type: 'CLEAR_DELETE_SELECTION';
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getRecipes = (): GetRecipesAction => {
  return {
    type: 'GET_RECIPES',
  };
};

export const addRecipe = (recipe: Recipe, recipeId: string = ''): AddRecipeAction => {
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

export const removeRecipesSelected = (): RemoveRecipesSelectedAction => {
  return {
    type: 'REMOVE_RECIPES_SELECTED',
  };
};

export const isInDeleteSelectionMode = (
  isInDeleteSelectionMode: boolean,
): IsInDeleteSelectionMode => {
  return {
    type: 'IS_IN_DELETE_SELECTION_MODE',
    payload: isInDeleteSelectionMode,
  };
};

export const addToDeleteSelection = (recipe: Recipe): AddToDeleteSelection => {
  return {
    type: 'ADD_TO_DELETE_SELECTION',
    payload: recipe,
  };
};

export const removeFromDeleteSelection = (recipe: Recipe): RemoveFromDeleteSelection => {
  return {
    type: 'REMOVE_FROM_DELETE_SELECTION',
    payload: recipe,
  };
};

export const clearDeleteSelection = (): ClearDeleteSelection => {
  return {
    type: 'CLEAR_DELETE_SELECTION',
  };
};
