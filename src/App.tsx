import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Navigation } from './navigation';
import { AuthorizationProvider } from './services/providers/AuthProvider';
import store from './store/store';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <AuthorizationProvider>
          {/* <UserProfileProvider> */}
          <Navigation />
          {/* </UserProfileProvider> */}
        </AuthorizationProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
