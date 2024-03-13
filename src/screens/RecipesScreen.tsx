import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import RecipesComponent from '../components/RecipesComponent';

import React from 'react';

import { COLORS } from '../globals/styles/index';
import { UserProfilState } from '../models/UserProfilStateModels';
import { RecipesStackNavigation } from '../navigation/RecipesStackNavigator';

interface RecipeScreenProps {
  navigation: RecipesStackNavigation;
}

const RecipesScreen: React.FC<RecipeScreenProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );

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
