import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';

import LoginScreen from '../../screens/authScreens/LoginScreen';
import SignupScreen from '../../screens/authScreens/SignupScreen';
import { NavigationProp } from '@react-navigation/native';
import BottomTabNavigator from '../tabNavigation/BottomTabNavigator';
import { Authorization } from '../../services/providers/AuthProvider';




export type AuthStackScreenNames = ["Login", "Signup", "Authenticated"]
export type AuthStackParamList = Record<AuthStackScreenNames[number], undefined>;
export type AuthStackNavigation = NavigationProp<AuthStackParamList>;
const Stack = createStackNavigator();

export const AuthNavigation = () => {
  const authContext = useContext(Authorization);
  if (!authContext) {
    return null;
  }
  const { user, isLoading } = authContext;
  if (isLoading) {
    return null;
  }

  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    {
      user ?
        <Stack.Screen name="Authenticated" component={BottomTabNavigator} />
        :
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
          />
        </Stack.Group>
    }
  </Stack.Navigator>
};
