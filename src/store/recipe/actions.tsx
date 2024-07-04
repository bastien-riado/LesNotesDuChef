import { Recipe } from '../../models/RecipeModels';

export type RecipeAction = GetRecipeAction | SetRecipeAction;

export interface GetRecipeAction {
  type: 'GET_RECIPE';
}

export interface SetRecipeAction {
  type: 'SET_RECIPE';
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
