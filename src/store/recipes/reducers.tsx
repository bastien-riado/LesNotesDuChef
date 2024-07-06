import { RecipesState } from '../../models/RecipesStateModels';
import { RecipesAction } from './actions';

//initial state
const initialState: RecipesState = {
  recipes: [],
  isInDeleteSelectionMode: false,
  inDeleteSelection: [],
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
        recipes: [action.payload, ...state.recipes],
      };

    case 'UPDATE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.id ? action.payload : recipe,
        ),
      };
    case 'REMOVE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload.id),
      };
    case 'REMOVE_RECIPES':
      return {
        ...state,
        recipes: [],
      };
    case 'REMOVE_RECIPES_SELECTED':
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) =>
            !state.inDeleteSelection.find((selected) => selected.id === recipe.id),
        ),
        inDeleteSelection: [],
      };
    case 'IS_IN_DELETE_SELECTION_MODE':
      return {
        ...state,
        isInDeleteSelectionMode: action.payload,
      };

    case 'ADD_TO_DELETE_SELECTION':
      return {
        ...state,
        inDeleteSelection: [...state.inDeleteSelection, action.payload],
      };
    case 'REMOVE_FROM_DELETE_SELECTION':
      return {
        ...state,
        inDeleteSelection: state.inDeleteSelection.filter(
          (recipe) => recipe.id !== action.payload.id,
        ),
      };
    case 'CLEAR_DELETE_SELECTION':
      return {
        ...state,
        inDeleteSelection: [],
      };
    default:
      return state;
  }
};
