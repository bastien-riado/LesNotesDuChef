import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import '../i18n.config';
import {
  darkTheme,
  lightTheme,
  navigationDarkTheme,
  navigationLightTheme,
} from './globals/themes';
import { UserProfilState } from './models/UserProfilStateModels';
import { Navigation } from './navigation';
import { AuthorizationProvider } from './services/providers/AuthProvider';
import store from './store/store';

export default function App() {
  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1500);
  }, []);

  return (
    <ReduxProvider store={store}>
      <AppContainer />
    </ReduxProvider>
  );
}

const AppContainer = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const styledTheme = mode === 'light' ? lightTheme : darkTheme;
  const navigationTheme = mode === 'light' ? navigationLightTheme : navigationDarkTheme;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={styledTheme}>
        <NavigationContainer theme={navigationTheme}>
          <AuthorizationProvider>
            <PaperProvider>
              <BottomSheetModalProvider>
                <Navigation />
                <Toast />
              </BottomSheetModalProvider>
            </PaperProvider>
          </AuthorizationProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};
