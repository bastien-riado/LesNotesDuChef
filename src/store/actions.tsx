import {THEME_CHANGE} from './constants';

export interface ThemeChangeAction {
  type: typeof THEME_CHANGE;
  payload: 'light' | 'dark';
}

export const switchMode = (mode: 'light' | 'dark'): ThemeChangeAction => {
  return {
    type: THEME_CHANGE,
    payload: mode,
  };
};
