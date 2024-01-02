import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import RecipesComponent from '../components/RecipesComponent';

import React from 'react';

import { COLORS } from '../globals/styles/index';
import { RecipesStackNavigation } from '../navigation/RecipesStackNavigator';
import { Mode } from '../models/themeStateModels';

interface RecipeScreenProps {
  navigation: RecipesStackNavigation;
}

const RecipesScreen: React.FC<RecipeScreenProps> = ({ navigation }) => {
  const mode: Mode = useSelector((state: any) => state.theme.mode);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.BGCOLOR[mode] }]}>
      <RecipesComponent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
});

export default RecipesScreen;
