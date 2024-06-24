import { Recipe } from '../../models/RecipeModels';
import { getRecipes } from '../../services/RecipeService';
import { AppDispatch } from '../store';
import { addRecipe } from './actions';

export const fetchRecipes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const recipes: Recipe[] = (await getRecipes()) as Recipe[];
      recipes.forEach((recipe) => {
        dispatch(addRecipe(recipe));
      });
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  };
};
