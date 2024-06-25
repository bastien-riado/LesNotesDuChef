import { StyleSheet, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import RecipesComponent from '../components/RecipesComponent';

import React, { useEffect, useState } from 'react';

import Spinner from 'react-native-loading-spinner-overlay';
import BlankStateComponent from '../components/BlankStateComponent';
import { COLORS } from '../globals/styles';
import { RecipesState } from '../models/RecipesStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';
import { fetchRecipesThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';

interface RecipeScreenProps {
  navigation: any;
}

const RecipesScreen: React.FC<RecipeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipes = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.recipes,
  );

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (recipes.length === 0) {
        await dispatch(fetchRecipesThunk());
      }
      setIsInitialLoading(false);
    };
    fetchInitialData();
  }, [dispatch, recipes.length]);

  if (isInitialLoading) {
    return (
      <View style={styles.container}>
        <Spinner
          visible={true}
          textContent="Loading..." // TODO add translations
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: COLORS.BG_PRIMARYCOLOR[mode] }]}>
      {recipes.length === 0 ? (
        <BlankStateComponent
          screenName="Recipes"
          navigation={navigation}
        />
      ) : (
        <RecipesComponent navigation={navigation} />
      )}
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
