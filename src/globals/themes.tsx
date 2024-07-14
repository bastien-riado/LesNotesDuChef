import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  backgroundPrimary: '#ffffff',
  backgroundSecondary: '#efefef',
  text: '#000000',
  button: '#DBF1FD',
  closeButton: '#000000',
  icon: '#000000',
  closeIcon: '#ffffff',
  activeLink: '#0056b3',
  inactiveLink: '#000000',
  success: '#3adb76',
  warning: '#ffae00',
  alert: '#cc4b37',
  bgDelete: '#ff0000',
};

export const darkTheme = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#404252',
  text: '#ffffff',
  button: '#36517D',
  closeButton: '#ffffff',
  icon: '#ffffff',
  closeIcon: '#000000',
  activeLink: '#e57373',
  inactiveLink: '#ffffff',
  success: '#3adb76',
  warning: '#ffae00',
  alert: '#cc4b37',
  bgDelete: '#ff0000',
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
