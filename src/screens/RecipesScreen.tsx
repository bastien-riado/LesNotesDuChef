import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import RecipesComponent from '../components/RecipesComponent';

import React from 'react';

import { COLORS } from '../globals/styles';
import { RecipesState } from '../models/RecipesStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';

interface RecipeScreenProps {
  navigation: any;
}

const RecipesScreen: React.FC<RecipeScreenProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipes = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.recipes,
  );

  return (
    // <BlankStateComponent
    //   screenName="Recipes"
    //   navigation={navigation}
    // />
    <View style={[styles.container, { backgroundColor: COLORS.BG_PRIMARYCOLOR[mode] }]}>
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
