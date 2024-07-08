import { Language, Mode } from '../../models/UserProfilStateModels';
import { LANGUAGE_CHANGE, THEME_CHANGE } from './constants';

export type UserProfilAction =
  | SetUserEmailAction
  | SetUserUidAction
  | SetUserProfilImageAction
  | ThemeChangeAction
  | LanguageChangeAction
  | LogoutAction;

////////////////////////////////////////////////////////////////////

export interface SetUserEmailAction {
  type: 'SET_USER_EMAIL';
  payload: string;
}

export interface SetUserUidAction {
  type: 'SET_USER_UID';
  payload: string;
}

export interface SetUserProfilImageAction {
  type: 'SET_USER_PROFIL_IMAGE';
  payload: string;
}

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

////////////////////////////////////////////////////////////////////

export const setUserEmail = (email: string): SetUserEmailAction => {
  return {
    type: 'SET_USER_EMAIL',
    payload: email,
  };
};

export const setUserUid = (uid: string): SetUserUidAction => {
  return {
    type: 'SET_USER_UID',
    payload: uid,
  };
};

export const setUserProfilImage = (profilImage: string): SetUserProfilImageAction => {
  return {
    type: 'SET_USER_PROFIL_IMAGE',
    payload: profilImage,
  };
};

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
