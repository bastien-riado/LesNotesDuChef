import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { RecipesState } from '../../models/RecipesStateModels';
import NewRecipeStackNavigator from '../NewRecipeStackNavigator';
import RecipesStackNavigator from '../RecipesStackNavigator';
import SettingsStackNavigator from '../SettingsStackNavigator';

const Tab = createBottomTabNavigator();

const getCurrentRouteName = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
  return routeName;
};

const BottomTabNavigator = () => {
  const [currentRouteName, setCurrentRouteName] = useState('RecipesStack');
  const isInEdition = useSelector(
    (state: { recipe: { isInEdition: boolean } }) => state.recipe.isInEdition,
  );
  const isInDeleteSelectionMode = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.isInDeleteSelectionMode,
  );
  const theme = useTheme();
  const { t } = useTranslation();

  const screenOptions = ({ route }: any) => {
    const routeName = route.name;

    let iconName = '';
    let iconNameFocused = '';
    let label = '';

    switch (routeName) {
      case 'RecipesStack':
        iconName = 'view-day-outline';
        iconNameFocused = 'view-day';
        label = t('RecipeList.Title');
        break;
      case 'NewRecipeStack':
        iconName = 'plus-outline';
        iconNameFocused = 'plus-thick';
        label = t('NewRecipe.Title');
        break;
      case 'SettingsStack':
        iconName = 'account-cog-outline';
        iconNameFocused = 'account-cog';
        label = t('UserProfil.Settings.Title');
        break;
    }

    return {
      tabBarIcon: ({ color, focused, size }: any) => (
        <MaterialCommunityIcons
          name={focused ? iconNameFocused : iconName}
          size={size}
          color={color}
        />
      ),
      tabBarLabel: label,
      headerShown: false,
    };
  };

  const tabBar = ({ navigation, state, descriptors, insets }: any) => {
    const isRecipeDetailsScreen = currentRouteName === 'RecipeDetails';
    const isInNewRecipeStack =
      currentRouteName === 'NewRecipeByHand' ||
      currentRouteName === 'NewRecipeGenerated' ||
      currentRouteName === 'NewRecipeByVision';

    return (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        activeColor={theme.activeNavigation}
        inactiveColor={theme.inactiveNavigation}
        activeIndicatorStyle={{
          backgroundColor: theme.activeIndicator,
        }}
        style={{
          backgroundColor: theme.backgroundPrimary,
          borderTopColor: theme.divider,
          borderTopWidth: 1,
          display:
            isInEdition ||
            isInDeleteSelectionMode ||
            isRecipeDetailsScreen ||
            isInNewRecipeStack
              ? 'none'
              : 'flex',
        }}
        onTabPress={({ route, preventDefault }: any) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ color, focused, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.title;

          return label;
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBar={tabBar}
      initialRouteName="RecipesStack"
      screenListeners={({ route }) => ({
        state: () => {
          const routeName = getCurrentRouteName(route);
          setCurrentRouteName(routeName);
        },
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
        name="SettingsStack"
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
