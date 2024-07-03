import { StyleSheet, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import RecipesComponent from '../components/RecipesComponent';

import React, { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import BlankStateComponent from '../components/custom/BlankStateComponent';
import { COLORS } from '../globals/styles';
import { RecipesState } from '../models/RecipesStateModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { RecipesScreenProps } from '../navigation/NavigationTypes';
import { fetchRecipesThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';

const RecipesScreen: React.FC<RecipesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipes = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.recipes,
  );
  const themedStyle = styles(mode);
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (isFocused && recipes.length === 0) {
        setIsInitialLoading(true);
        try {
          await dispatch(fetchRecipesThunk());
          setIsInitialLoading(false);
        } catch (error) {
          console.error('Failed to fetch recipes:', error);
          setIsInitialLoading(false);
        }
      }
    };
    fetchInitialData();
    return () => {};
  }, [dispatch, isFocused, recipes.length]);

  if (isInitialLoading) {
    return (
      <View style={themedStyle.container}>
        <Spinner
          visible={true}
          textContent={t('RecipeList.Loading')}
        />
      </View>
    );
  }

  return (
    <View style={themedStyle.container}>
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

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },
  });

export default RecipesScreen;
