import { ThemeState } from '../models/themeStateModels';
import { ThemeChangeAction } from './actions';
import { THEME_CHANGE } from './constants';

type ThemeAction = ThemeChangeAction;

//initial state
const initialState: ThemeState = {
  mode: 'light',
};

//reducer
const themeReducer = (
  state = initialState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case THEME_CHANGE:
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
};

//DO NOT FORGET TO EXPORT
export default themeReducer;
