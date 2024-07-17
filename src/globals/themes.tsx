import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightTheme = {
  backgroundPrimary: '#ffffff',
  backgroundSecondary: '#f5f5f5',
  activeLink: '#75B8FF',
  text: '#000000',
  button: '#75B8FF',
  buttonText: '#ffffff',
  closeButton: '#000000',
  icon: '#000000',
  closeIcon: '#ffffff',
  activeNavigation: '#007bff',
  inactiveLink: '#000000',
  success: '#28a745',
  warning: '#ffc107',
  alert: '#dc3545',
  backgroundDanger: '#ff0000',
  textDanger: '#ffffff',
  divider: '#dcdcdc',
  linearGradient: ['#ADD8E6', '#FFFFFF'],
};

export const darkTheme = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#1f1f1f',
  activeLink: '#bb86fc',
  text: '#ffffff',
  button: '#bb86fc',
  buttonText: '#121212',
  closeButton: ' #ffffff',
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
  linearGradient: ['#D8BFD8', '#4B0082'],
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
