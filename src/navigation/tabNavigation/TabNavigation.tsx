import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useSelector} from 'react-redux';

import Icon from '../../components/IconComponent';
import {COLORS, TYPO} from '../../globals/styles/index';
import HomeScreen from '../../screens/HomeScreen';
import RecipeScreen from '../../screens/RecipeScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const theme = useSelector((state: any) => state.theme.mode);
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'light' ? COLORS.BGCOLOR.LIGHT : COLORS.BGCOLOR.DARK,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: theme === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              name="home"
              size={TYPO.ICONSIZE.MEDIUM}
              color={theme === 'light' ? COLORS.ICONCOLOR.LIGHT : COLORS.ICONCOLOR.DARK}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RecipeScreen"
        component={RecipeScreen}
        options={{
          tabBarLabel: 'Recipe',
          tabBarLabelStyle: {
            color: theme === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              name="food"
              size={TYPO.ICONSIZE.MEDIUM}
              color={theme === 'light' ? COLORS.ICONCOLOR.LIGHT : COLORS.ICONCOLOR.DARK}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
