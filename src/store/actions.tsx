import { Mode } from '../models/themeStateModels';
import { THEME_CHANGE } from './constants';

export interface ThemeChangeAction {
  type: typeof THEME_CHANGE;
  payload: Mode;
}

export const switchMode = (mode: Mode): ThemeChangeAction => {
  return {
    type: THEME_CHANGE,
    payload: mode,
  };
};
