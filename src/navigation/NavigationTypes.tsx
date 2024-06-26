import { StackNavigationProp } from '@react-navigation/stack';
import { Recipe } from '../models/RecipeModels';

// Define param lists for each navigator
export type RootStackParamList = {
  Recipes: undefined;
  RecipeDetails: { recipe: Recipe };
  NewRecipeHome: undefined;
  NewRecipeByHand: undefined;
  NewRecipeGenerated: undefined;
  NewRecipeByVision: undefined;
  Settings: undefined;
};

// Navigation prop types for each screen
export type RecipesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Recipes'
>;
export type RecipeDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RecipeDetails'
>;
export type NewRecipeHomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewRecipeHome'
>;
export type NewRecipeByHandScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewRecipeByHand'
>;
export type NewRecipeGeneratedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewRecipeGenerated'
>;
export type NewRecipeByVisionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewRecipeByVision'
>;
export type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

// Component props
export interface RecipesScreenProps {
  navigation: RecipesScreenNavigationProp;
}

export interface RecipeDetailScreenProps {
  navigation: RecipeDetailsScreenNavigationProp;
  route: { params: { recipe: Recipe } };
}

export interface NewRecipeHomeScreenProps {
  navigation: NewRecipeHomeScreenNavigationProp;
}

export interface NewRecipeByHandScreenProps {
  navigation: NewRecipeByHandScreenNavigationProp;
}

export interface NewRecipeGeneratedScreenProps {
  navigation: NewRecipeGeneratedScreenNavigationProp;
}

export interface NewRecipeByVisionScreenProps {
  navigation: NewRecipeByVisionScreenNavigationProp;
}

export interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}
