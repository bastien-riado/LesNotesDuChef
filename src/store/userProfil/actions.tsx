import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, Mode } from '../../models/UserProfilStateModels';

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
  type: 'THEME_CHANGE';
  payload: Mode;
}

export interface LanguageChangeAction {
  type: 'LANGUAGE_CHANGE';
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

export const switchMode = (mode: Mode) => async (dispatch: any) => {
  try {
    await AsyncStorage.setItem('appThemeMode', mode);
    dispatch({
      type: 'THEME_CHANGE',
      payload: mode,
    });
  } catch (error) {
    console.error('Error saving theme mode to AsyncStorage', error);
  }
};

export const loadMode = () => async (dispatch: any) => {
  try {
    const mode = await AsyncStorage.getItem('appThemeMode');
    if (mode) {
      dispatch({
        type: 'THEME_CHANGE',
        payload: mode as Mode,
      });
    }
  } catch (error) {
    console.error('Error loading theme mode from AsyncStorage', error);
  }
};

export const languageChange = (language: Language): LanguageChangeAction => {
  return {
    type: 'LANGUAGE_CHANGE',
    payload: language,
  };
};

export const logout = (): LogoutAction => {
  return {
    type: 'LOG_OUT',
  };
};
