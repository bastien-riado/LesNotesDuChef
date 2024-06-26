import { UserProfilState } from '../../models/UserProfilStateModels';
import { UserProfilAction } from './actions';
import { LANGUAGE_CHANGE, THEME_CHANGE } from './constants';

//initial state
const initialState: UserProfilState = {
  mode: 'light',
  language: 'fr',
};

//reducer
export const userProfilReducer = (
  state = initialState,
  action: UserProfilAction,
): UserProfilState => {
  switch (action.type) {
    case THEME_CHANGE:
      return {
        ...state,
        mode: action.payload,
      };
    case LANGUAGE_CHANGE:
      return {
        ...state,
        language: action.payload,
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};
