import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../../screens/authScreens/LoginScreen';
import SignupScreen from '../../screens/authScreens/SignupScreen';

const Stack = createStackNavigator();

export const AuthNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
    />
  </Stack.Navigator>
);
