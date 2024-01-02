import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';

import { COLORS, TYPO } from '../../globals/styles/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsScreen from '../../screens/SettingsScreen';
import NewRecipeScreen from '../../screens/NewRecipeScreen';
import { NavigationProp } from '@react-navigation/native';
import RecipesStackNavigator from '../RecipesStackNavigator';
import { Mode } from '../../models/themeStateModels';


export type BottomTabScreenNames = ["RecipesStack", "NewRecipe", "Settings", "RecipeDetails"]
export type RootTabParamList = Record<BottomTabScreenNames[number], undefined>;
export type TabNavigation = NavigationProp<RootTabParamList>;

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const mode: Mode = useSelector((state: any) => state.theme.mode);
  return (
    <Tab.Navigator
      initialRouteName="RecipesStack"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.BGCOLOR[mode],
        },
      }}
    >
      <Tab.Screen
        name="RecipesStack"
        component={RecipesStackNavigator}
        options={{
          tabBarLabelStyle: {
            color: COLORS.TEXTCOLOR[mode],
          },
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="view-list"
              size={TYPO.ICONSIZE.MEDIUM}
              color={COLORS.ICONCOLOR[mode]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NewRecipe"
        component={NewRecipeScreen}
        options={{
          tabBarLabelStyle: {
            color: COLORS.TEXTCOLOR[mode],
          },
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="plus"
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                COLORS.ICONCOLOR[mode]
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabelStyle: {
            color: COLORS.TEXTCOLOR[mode],
          },
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="cog"
              size={TYPO.ICONSIZE.MEDIUM}
              color={COLORS.ICONCOLOR[mode]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
