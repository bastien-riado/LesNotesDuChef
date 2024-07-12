import { RecipeState } from '../../models/RecipeStateModels';
import { RecipeAction } from './actions';

const initialState: RecipeState = {
  currentRecipe: {
    id: '',
    ownerId: '',
    name: '',
    description: '',
    time: '',
    difficulty: '',
    image: '',
  },
  isInEdition: false,
};

export const recipeReducer = (
  state = initialState,
  action: RecipeAction,
): RecipeState => {
  switch (action.type) {
    case 'GET_RECIPE':
      return {
        ...state,
      };
    case 'SET_RECIPE':
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case 'TOGGLE_MODIFICATION':
      return {
        ...state,
        isInEdition: !state.isInEdition,
      };
    case 'UPDATE_CURRENT_RECIPE':
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case 'SET_RECIPE_IMAGE':
      return {
        ...state,
        currentRecipe: {
          ...state.currentRecipe,
          image: action.payload,
        },
      };

    default:
      return state;
  }
};
