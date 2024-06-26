import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { COLORS } from '../../globals/styles/index';
import { UserProfilState } from '../../models/UserProfilStateModels';
import NewRecipeStackNavigator from '../NewRecipeStackNavigator';
import RecipesStackNavigator from '../RecipesStackNavigator';
import SettingsStackNavigator from '../SettingsStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();

  const screenOptions = ({ route }: any) => ({
    tabBarIcon: ({ color, size }: any) => {
      let iconName: string = '';

      if (route.name === 'RecipesStack') {
        iconName = 'view-list';
      } else if (route.name === 'NewRecipeStack') {
        iconName = 'plus';
      } else if (route.name === 'SettingsStack') {
        iconName = 'cog';
      }

      return (
        <MaterialCommunityIcons
          name={iconName}
          size={size}
          color={color}
        />
      );
    },
    headerShown: false,
    tabBarActiveTintColor: COLORS.ACTIVE_LINK[mode],
    tabBarInactiveTintColor: COLORS.ICONCOLOR[mode],
    tabBarStyle: {
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="RecipesStack"
        component={RecipesStackNavigator}
        options={{ title: t('RecipeList.Title') }}
      />
      <Tab.Screen
        name="NewRecipeStack"
        component={NewRecipeStackNavigator}
        options={{ title: t('NewRecipe.Title') }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{ title: t('UserProfil.Settings.Title') }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
