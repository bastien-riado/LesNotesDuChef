export type RecipeStep = {
  title: string,
  content: string,
  recipeId?: string,
  index?: string
}

export interface Recipe {
  id?: string;
  ownerId?: string;
  title: string;
  steps?: Array<RecipeStep>;
  time: string;
  difficulty: string;
}


