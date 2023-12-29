import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';
import { COLORS, TYPO } from '../../globals/styles/index';
import RecipeScreen from '../../screens/RecipeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsScreen from '../../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const theme = useSelector((state: any) => state.theme.mode);
  return (
    <Tab.Navigator
      initialRouteName="RecipeScreen"
      screenOptions={{
        tabBarStyle: {
          backgroundColor:
            theme === 'light' ? COLORS.BGCOLOR.LIGHT : COLORS.BGCOLOR.DARK,
        },
      }}
    >
      <Tab.Screen
        name="RecipeScreen"
        component={RecipeScreen}
        options={{
          tabBarLabel: 'List of recipes',
          tabBarLabelStyle: {
            color:
              theme === 'light'
                ? COLORS.TEXTCOLOR.LIGHT
                : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="view-list"
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                theme === 'light'
                  ? COLORS.ICONCOLOR.LIGHT
                  : COLORS.ICONCOLOR.DARK
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddRecipeScreen"
        component={RecipeScreen}
        options={{
          tabBarLabel: 'Add New Recipe',
          tabBarLabelStyle: {
            color:
              theme === 'light'
                ? COLORS.TEXTCOLOR.LIGHT
                : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="plus"
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                theme === 'light'
                  ? COLORS.ICONCOLOR.LIGHT
                  : COLORS.ICONCOLOR.DARK
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {
            color:
              theme === 'light'
                ? COLORS.TEXTCOLOR.LIGHT
                : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="plus"
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                theme === 'light'
                  ? COLORS.ICONCOLOR.LIGHT
                  : COLORS.ICONCOLOR.DARK
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
