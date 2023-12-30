import {DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import HomeScreen from '../../screens/HomeScreen';
import RecipeDetailsScreen from '../../screens/RecipeDetailsScreen';
import RecipeScreen from '../../screens/RecipeScreen';
import DrawerNavigator from '../drawerNavigation/DrawerNavigation';

const Stack = createStackNavigator();

const COLORS = require('../../globals/styles/colors.tsx');

const DrawerButton = ({navigation}: any, theme: any) => (
  <MaterialCommunityIcons
    name="menu"
    size={25}
    color={theme === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK}
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
  />
);

const MainNavigation = () => {
  const theme = useSelector((state: any) => state.theme.mode);

  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={({navigation}) => ({
          title: 'Les Notes du Chef',
          headerStyle: {
            backgroundColor:
              theme === 'light' ? COLORS.BGCOLOR.LIGHT : COLORS.BGCOLOR.DARK,
          },
          headerTintColor:
            theme === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          headerTitleStyle: {
            fontWeight: 'bold',
            justifyContent: 'center',
            textAlign: 'left',
          },
          headerLeft: () => DrawerButton({navigation: navigation}, theme),
        })}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          title: 'Les Notes du Chef',
          headerStyle: {
            backgroundColor:
              theme === 'light' ? COLORS.BGCOLOR.LIGHT : COLORS.BGCOLOR.DARK,
          },
          headerTintColor:
            theme === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'left',
          },
        })}
      />
      <Stack.Screen
        name="RecipeScreen"
        component={RecipeScreen}
        options={{
          title: 'Les Notes du Chef',
          headerStyle: {
            backgroundColor:
              theme === 'light' ? COLORS.BGCOLOR.LIGHT : COLORS.BGCOLOR.DARK,
          },
          headerTintColor:
            theme === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'left',
          },
        }}
      />
      <Stack.Screen
        name="RecipeDetailsScreen"
        component={RecipeDetailsScreen}
        options={{
          title: 'Les Notes du Chef',
          headerStyle: {
            backgroundColor:
              theme === 'light' ? COLORS.BGCOLOR.LIGHT : COLORS.BGCOLOR.DARK,
          },
          headerTintColor:
            theme === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'left',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
