import { Recipe } from '../../models/RecipeModels';
import { updateRecipeImage } from '../../services/RecipeService';
import { updateRecipe } from '../recipes/actions';
import { AppDispatch } from '../store';
import { updateCurrentRecipe } from './actions';

export const updateRecipeImageThunk = (recipe: Recipe, downloadUrl: string) => {
  return async (dispatch: AppDispatch) => {
    await updateRecipeImage(recipe.id, downloadUrl);
    dispatch(updateCurrentRecipe({ ...recipe, image: downloadUrl }));
    dispatch(updateRecipe({ ...recipe, image: downloadUrl }));
  };
};
