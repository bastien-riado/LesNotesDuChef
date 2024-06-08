import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../globals/styles/index';
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
  const iconNames = {
    RecipesStack: 'view-list',
    NewRecipeStack: 'plus',
    Settings: 'cog',
  };

  return (props: NavigationOpts) => {
    const {
      route,
    }: { route: RouteProp<RootTabParamList, BottomTabScreenNames[number]> } = props;
    return {
      title: titleForScreenNames[route.name],
      iconNames: iconNames[route.name],
      headerShown: route.name !== 'RecipesStack' && route.name !== 'NewRecipeStack',
      headerStyle: {
        backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
      },
      headerTitleStyle: {
        color: COLORS.TEXTCOLOR[mode],
      },
      tabBarStyle: {
        backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
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
      screenOptions={({ route }) => ({
        ...navigationOptions(mode)({ route, navigation: undefined }),
        tabBarIcon: ({ color, size }) => {
          const iconName = navigationOptions(mode)({
            route,
            navigation: undefined,
          }).iconNames;

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: COLORS.ACTIVE_LINK[mode],
        tabBarInactiveTintColor: COLORS.ICONCOLOR[mode],
      })}
    >
      <Tab.Screen
        name="RecipesStack"
        component={RecipesStackNavigator}
      />
      <Tab.Screen
        name="NewRecipeStack"
        component={NewRecipeStackNavigator}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
