import { Ingredient } from './IngredientModels';

export interface Recipe {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  ingredients?: Ingredient[];
  time: string;
  difficulty: string;
  image: string;
}
