import { Recipe } from './RecipeModels';

export interface RecipesState {
  recipes: Recipe[];
  hasFetched: boolean;
  isInDeleteSelectionMode: boolean;
  inDeleteSelection: Recipe[];
}
