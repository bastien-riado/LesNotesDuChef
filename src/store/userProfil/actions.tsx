import { Language, Mode } from '../../models/UserProfilStateModels';
import { LANGUAGE_CHANGE, THEME_CHANGE } from './constants';

export type UserProfilAction = ThemeChangeAction | LanguageChangeAction | LogoutAction;
export interface ThemeChangeAction {
  type: typeof THEME_CHANGE;
  payload: Mode;
}

export interface LanguageChangeAction {
  type: typeof LANGUAGE_CHANGE;
  payload: Language;
}

export interface LogoutAction {
  type: 'LOG_OUT';
}

export const switchMode = (mode: Mode): ThemeChangeAction => {
  return {
    type: THEME_CHANGE,
    payload: mode,
  };
};

export const languageChange = (language: Language): LanguageChangeAction => {
  return {
    type: LANGUAGE_CHANGE,
    payload: language,
  };
};

export const logout = (): LogoutAction => {
  return {
    type: 'LOG_OUT',
  };
};
