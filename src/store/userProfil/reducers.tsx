import { UserProfilState } from '../../models/UserProfilStateModels';
import { UserProfilAction } from './actions';

//initial state
const initialState: UserProfilState = {
  uid: '',
  email: '',
  profilImage: '',
  mode: 'light',
  language: 'fr',
};

//reducer
export const userProfilReducer = (
  state = initialState,
  action: UserProfilAction,
): UserProfilState => {
  switch (action.type) {
    case 'SET_USER_UID':
      return {
        ...state,
        uid: action.payload,
      };
    case 'SET_USER_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_USER_PROFIL_IMAGE':
      return {
        ...state,
        profilImage: action.payload,
      };
    case 'THEME_CHANGE':
      return {
        ...state,
        mode: action.payload,
      };
    case 'LANGUAGE_CHANGE':
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
