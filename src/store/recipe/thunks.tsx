import { updateRecipeImage } from '../../services/RecipeService';
import { AppDispatch } from '../store';
import { setRecipeImage } from './actions';

export const updateRecipeImageThunk = (recipeId: string, downloadUrl: string) => {
  return async (dispatch: AppDispatch) => {
    console.log('updateRecipeImageThunk', recipeId, downloadUrl);
    await updateRecipeImage(recipeId, downloadUrl);
    console.log('apres le await');
    dispatch(setRecipeImage(downloadUrl));
  };
};
