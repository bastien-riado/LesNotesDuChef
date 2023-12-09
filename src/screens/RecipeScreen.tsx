import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import RecipesComponent from '../components/RecipesComponent';

import React = require('react');

import { COLORS } from '../globals/styles/index';

const RecipeScreen = () => {
  const theme = useSelector((state: any) => state.theme.mode);

  return (
    <View style={[styles.container, theme === 'light' ? styles.light : styles.dark]}>
      <RecipesComponent />
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

export default RecipeScreen;
