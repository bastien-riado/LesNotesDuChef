import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import React = require('react');

import { COLORS } from '../globals/styles/index';
import NewRecipeComponent from '../components/NewRecipeComponent';
import { Text } from 'react-native';

const NewRecipeScreen = () => {
  const theme = useSelector((state: any) => state.theme.mode);

  return (
    <View style={[styles.container, theme === 'light' ? styles.light : styles.dark]}>
      <NewRecipeComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  light: {
    backgroundColor: COLORS.BGCOLOR.LIGHT,
  },
  dark: {
    backgroundColor: COLORS.BGCOLOR.DARK,
  },
});

export default NewRecipeScreen;
