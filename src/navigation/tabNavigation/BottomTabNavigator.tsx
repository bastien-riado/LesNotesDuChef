import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { RecipesState } from '../../models/RecipesStateModels';
import NewRecipeStackNavigator from '../NewRecipeStackNavigator';
import RecipesStackNavigator from '../RecipesStackNavigator';
import SettingsStackNavigator from '../SettingsStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const isInEdition = useSelector(
    (state: { recipe: { isInEdition: boolean } }) => state.recipe.isInEdition,
  );
  const isInDeleteSelectionMode = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.isInDeleteSelectionMode,
  );
  const { t } = useTranslation();
  const theme = useTheme();

  const screenOptions = ({ route, navigation }: any) => {
    const routeName = navigation
      .getState()
      .routes[navigation.getState().index]?.state?.routes?.slice(-1)[0]?.name;
    // Utiliser cette methode pour cacher la tabBar
    const isRecipeDetailsScreen = routeName === 'RecipeDetails';
    const isInNewRecipeStack =
      routeName === 'NewRecipeByHand' ||
      routeName === 'NewRecipeGenerated' ||
      routeName === 'NewRecipeByVision';

    return {
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
      tabBarActiveTintColor: theme.activeNavigation,
      tabBarInactiveTintColor: theme.icon,

      tabBarStyle: {
        backgroundColor: theme.backgroundPrimary,
        display:
          isInEdition ||
          isInDeleteSelectionMode ||
          isRecipeDetailsScreen ||
          isInNewRecipeStack
            ? 'none'
            : ('flex' as 'none' | 'flex'),
      },
    };
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="RecipesStack"
        component={RecipesStackNavigator}
        options={{
          title: t('RecipeList.Title'),
        }}
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
