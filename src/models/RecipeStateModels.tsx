import { Recipe } from './RecipeModels';

export interface RecipeState {
  currentRecipe: Recipe;
  isInEdition: boolean;
}
