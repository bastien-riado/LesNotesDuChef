import { Recipe } from './RecipeModels';

export interface RecipesState {
  recipes: Recipe[];
  isInDeleteSelectionMode: boolean;
  inDeleteSelection: Recipe[];
}
