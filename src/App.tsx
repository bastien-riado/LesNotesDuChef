import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { Provider as ReduxProvider } from 'react-redux';
import '../i18n.config';
import { Navigation } from './navigation';
import { AuthorizationProvider } from './services/providers/AuthProvider';
import store from './store/store';

export default function App() {
  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1500);
  }, []);

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <AuthorizationProvider>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </AuthorizationProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
