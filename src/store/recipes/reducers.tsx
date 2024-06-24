import { RecipesState } from '../../models/RecipesStateModels';
import { RecipesAction } from './actions';

//initial state
const initialState: RecipesState = {
  recipes: [],
};

//reducer
export const recipesReducer = (
  state = initialState,
  action: RecipesAction,
): RecipesState => {
  switch (action.type) {
    case 'GET_RECIPES':
      return {
        ...state,
      };
    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case 'REMOVE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload.id),
      };
    default:
      return state;
  }
};
