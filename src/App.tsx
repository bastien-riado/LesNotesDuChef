import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import '../i18n.config';
import { Navigation } from './navigation';
import { AuthorizationProvider } from './services/providers/AuthProvider';
import store from './store/userProfil/store';

export default function App() {
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
