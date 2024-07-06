import { Recipe } from '../../models/RecipeModels';

export type RecipeAction =
  | GetRecipeAction
  | SetRecipeAction
  | ToggleEditionAction
  | UpdateCurrentRecipeAction;

export interface GetRecipeAction {
  type: 'GET_RECIPE';
}

export interface SetRecipeAction {
  type: 'SET_RECIPE';
  payload: Recipe;
}

export interface ToggleEditionAction {
  type: 'TOGGLE_MODIFICATION';
}

export interface UpdateCurrentRecipeAction {
  type: 'UPDATE_CURRENT_RECIPE';
  payload: Recipe;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getRecipe = (): GetRecipeAction => {
  return {
    type: 'GET_RECIPE',
  };
};

export const setRecipe = (recipe: Recipe): SetRecipeAction => {
  return {
    type: 'SET_RECIPE',
    payload: recipe,
  };
};

export const toggleEdition = (): ToggleEditionAction => {
  return {
    type: 'TOGGLE_MODIFICATION',
  };
};

export const updateCurrentRecipe = (recipe: Recipe): UpdateCurrentRecipeAction => {
  return {
    type: 'UPDATE_CURRENT_RECIPE',
    payload: recipe,
  };
};
