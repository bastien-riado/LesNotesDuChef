import auth from '@react-native-firebase/auth';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeChangeAction, switchMode } from '../../store/actions';

import { Dispatch } from '@reduxjs/toolkit';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from '../../components/IconComponent';
import AboutScreen from '../../screens/AboutScreen';
import HomeScreen from '../../screens/HomeScreen';
import RecipeScreen from '../../screens/RecipeScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import { Authorization } from '../../services/providers/AuthProvider';

const Drawer = createDrawerNavigator();

const COLORS = require('../../globals/styles/colors.tsx');
const TYPO = require('../../globals/styles/typography.tsx');

const DrawerNavigator = ({ }) => {
  const theme = useSelector((state: any) => state.theme);
  const dispatch = useDispatch<Dispatch<ThemeChangeAction>>();
  const [mode, setMode] = useState(theme.mode);
  const handleThemeChange = () => {
    dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);

  // TODO utiliser le AuthProvider pour gérer l'authentification et s'assurer que le loader s'affiche correctement
  const authContext = useContext(Authorization);

  if (!authContext) {
    return null;
  }
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await auth().signOut();
      console.log('User signed out!');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  /****************************************************************************************************************/

  const DrawerHeaderContent = (props: any) => {
    return (
      <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#4f4f4f',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            top: -5,
          }}
        >
          <Text style={{ color: '#fff' }}>Home</Text>
        </View>
        <DrawerItemList {...props} />
        <TouchableOpacity onPress={handleThemeChange}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
          >
            <Icon
              name={mode === 'light' ? 'weather-night' : 'white-balance-sunny'}
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                mode === 'light'
                  ? styles.icon_light.color
                  : styles.icon_dark.color
              }
            />
            <Text
              style={{
                color:
                  mode === 'light'
                    ? COLORS.TEXTCOLOR.LIGHT
                    : COLORS.TEXTCOLOR.DARK,
                marginLeft: 34,
                fontWeight: 'bold',
              }}
            >
              Changer de mode
            </Text>
          </View>
        </TouchableOpacity>
        <Button title="Sign Out" onPress={handleSignOut} />
        <Spinner
          visible={isLoading}
          textContent={'Connexion au compte...'}
          textStyle={{ color: '#FFF' }}
        />
        <Text style={styles.text_light}>{`User ID: ${authContext.user}`}</Text>
      </DrawerContentScrollView>
    );
  };
  return (
    <Drawer.Navigator
      drawerContent={DrawerHeaderContent}
      screenOptions={{
        drawerStyle: {
          backgroundColor:
            mode === 'light' ? COLORS.BGCOLOR.LIGHT : COLORS.BGCOLOR.DARK,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerLabelStyle: {
            color:
              mode === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name={'home'}
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                mode === 'light'
                  ? COLORS.ICONCOLOR.LIGHT
                  : COLORS.ICONCOLOR.DARK
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          drawerLabel: 'Recipe',
          drawerLabelStyle: {
            color:
              mode === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name={'food'}
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                mode === 'light'
                  ? COLORS.ICONCOLOR.LIGHT
                  : COLORS.ICONCOLOR.DARK
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerLabelStyle: {
            color:
              mode === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name={'cog'}
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                mode === 'light'
                  ? COLORS.ICONCOLOR.LIGHT
                  : COLORS.ICONCOLOR.DARK
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerLabel: 'About',
          drawerLabelStyle: {
            color:
              mode === 'light' ? COLORS.TEXTCOLOR.LIGHT : COLORS.TEXTCOLOR.DARK,
          },
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name={'information'}
              size={TYPO.ICONSIZE.MEDIUM}
              color={
                mode === 'light'
                  ? COLORS.ICONCOLOR.LIGHT
                  : COLORS.ICONCOLOR.DARK
              }
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  icon_light: {
    color: COLORS.ICONCOLOR.LIGHT,
  },
  icon_dark: {
    color: COLORS.ICONCOLOR.DARK,
  },
  text_light: {
    color: COLORS.TEXTCOLOR.LIGHT,
  },
  text_dark: {
    color: COLORS.TEXTCOLOR.DARK,
  },
});
export default DrawerNavigator;

