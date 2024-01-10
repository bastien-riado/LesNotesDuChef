import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';

import { COLORS, TYPO } from '../../globals/styles/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsScreen from '../../screens/SettingsScreen';
import NewRecipeScreen from '../../screens/NewRecipeScreen';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import RecipesStackNavigator from '../RecipesStackNavigator';
import { Mode } from '../../models/themeStateModels';


export type BottomTabScreenNames = ["RecipesStack", "NewRecipe", "Settings"]
export type BottomTabParamList = Record<BottomTabScreenNames[number], undefined>;
export type BottomTabNavigation = NavigationProp<BottomTabParamList>;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const navigationOptions = (mode: Mode) => {
  type NavigationOpts = {
    route: RouteProp<BottomTabParamList, BottomTabScreenNames[number]>;
    navigation: any;
  };
  const titleForScreenNames = {
    RecipesStack: 'Liste des Recettes',
    NewRecipe: 'Nouvelle Recette',
    Settings: 'Paramètres'
  }

  return (props: NavigationOpts) => {
    const { route }: { route: RouteProp<BottomTabParamList, BottomTabScreenNames[number]> } = props;
    return {
      title: titleForScreenNames[route.name],
      headerShown: route.name !== 'RecipesStack',
      headerStyle: {
        backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
      },
      headerTitleStyle: {
        color: COLORS.TEXTCOLOR[mode]
      },
      tabBarStyle: {
        backgroundColor: COLORS.BGCOLOR[mode],
      },
      tabBarLabel: titleForScreenNames[route.name],
      tabBarLabelStyle: {
        color: COLORS.TEXTCOLOR[mode],
      },
    }
  }
};

const BottomTabNavigator = () => {
  const mode: Mode = useSelector((state: any) => state.theme.mode);
  return (
    <Tab.Navigator
      initialRouteName="RecipesStack"
      screenOptions={navigationOptions(mode)}
    >
      <Tab.Screen
        name="RecipesStack"
        component={RecipesStackNavigator}
        options={{
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
