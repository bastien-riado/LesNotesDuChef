import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';

import LoginScreen from '../../screens/authScreens/LoginScreen/LoginScreen';
import SignupScreen from '../../screens/authScreens/SignupScreen/SignupScreen';
import { Authorization } from '../../services/providers/AuthProvider';
import BottomTabNavigator from '../tabNavigation/BottomTabNavigator';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Authenticated: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigation = () => {
  const authContext = useContext(Authorization);
  if (!authContext) {
    return null;
  }
  const { user, isLoading } = authContext;
  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen
          name="Authenticated"
          component={BottomTabNavigator}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
