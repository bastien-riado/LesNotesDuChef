import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, TYPO } from '../../globals/styles/index';
import { Mode, UserProfilState } from '../../models/UserProfilStateModels';
import SettingsScreen from '../../screens/SettingsScreen';
import NewRecipeStackNavigator from '../NewRecipeStackNavigator';
import RecipesStackNavigator from '../RecipesStackNavigator';

export type BottomTabScreenNames = ['RecipesStack', 'NewRecipeStack', 'Settings'];
export type RootTabParamList = Record<BottomTabScreenNames[number], undefined>;
export type TabNavigation = NavigationProp<RootTabParamList>;

const Tab = createBottomTabNavigator<RootTabParamList>();

const navigationOptions = (mode: Mode) => {
  type NavigationOpts = {
    route: RouteProp<RootTabParamList, BottomTabScreenNames[number]>;
    navigation: any;
  };
  const { t } = useTranslation();
  const titleForScreenNames = {
    RecipesStack: t('RecipeList.Title'),
    NewRecipeStack: t('NewRecipe.Title'),
    Settings: t('UserProfil.Settings.Title'),
  };

  return (props: NavigationOpts) => {
    const {
      route,
    }: { route: RouteProp<RootTabParamList, BottomTabScreenNames[number]> } = props;
    return {
      title: titleForScreenNames[route.name],
      headerShown: route.name !== 'RecipesStack' && route.name !== 'NewRecipeStack',
      headerStyle: {
        backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
      },
      headerTitleStyle: {
        color: COLORS.TEXTCOLOR[mode],
      },
      tabBarStyle: {
        backgroundColor: COLORS.BGCOLOR[mode],
      },
      tabBarLabel: titleForScreenNames[route.name],
      tabBarLabelStyle: {
        color: COLORS.TEXTCOLOR[mode],
      },
    };
  };
};

const BottomTabNavigator = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
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
        name="NewRecipeStack"
        component={NewRecipeStackNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="plus"
              size={TYPO.ICONSIZE.MEDIUM}
              color={COLORS.ICONCOLOR[mode]}
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
