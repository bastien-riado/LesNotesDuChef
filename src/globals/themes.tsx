import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  backgroundPrimary: '#ffffff',
  backgroundSecondary: '#f5f5f5',
  activeLink: '#e0e0e0',
  text: '#000000',
  button: '#DBF1FD',
  closeButton: '#000000',
  icon: '#000000',
  closeIcon: '#ffffff',
  activeNavigation: '#007bff',
  inactiveLink: '#000000',
  success: '#3adb76',
  warning: '#ffae00',
  alert: '#cc4b37',
  backgroundDanger: '#ff0000',
  textDanger: '#ffffff',
  divider: '#dcdcdc',
};

export const darkTheme = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#1f1f1f',
  activeLink: '#333333',
  text: '#ffffff',
  button: '#36517D',
  closeButton: '#ffffff',
  icon: '#ffffff',
  closeIcon: '#000000',
  activeNavigation: '#bb86fc',
  inactiveLink: '#ffffff',
  success: '#3adb76',
  warning: '#ffae00',
  alert: '#cc4b37',
  backgroundDanger: '#ff0000',
  textDanger: '#ffffff',
  divider: '#444444',
};

export const navigationLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: lightTheme.backgroundPrimary,
    text: lightTheme.text,
    primary: lightTheme.activeLink,
  },
};

export const navigationDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: darkTheme.backgroundPrimary,
    text: darkTheme.text,
    primary: darkTheme.activeLink,
  },
};
