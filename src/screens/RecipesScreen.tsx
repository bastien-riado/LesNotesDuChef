import { View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import RecipesComponent from '../components/RecipesComponent/RecipesComponent';

import React, { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import styled from 'styled-components';
import BlankStateComponent from '../components/shared/BlankStateComponent/BlankStateComponent';
import { RecipesState } from '../models/RecipesStateModels';
import { RecipesScreenProps } from '../navigation/NavigationTypes';
import { getRecipes } from '../store/recipes/actions';
import { fetchRecipesThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';

const RecipesScreen: React.FC<RecipesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { recipes, hasFetched } = useSelector(
    (state: { recipes: RecipesState }) => state.recipes,
  );

  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (isFocused && !hasFetched) {
        setIsInitialLoading(true);
        try {
          await dispatch(fetchRecipesThunk());
          dispatch(getRecipes(true));
        } catch (error) {
          console.error('Failed to fetch recipes:', error);
        } finally {
          setIsInitialLoading(false);
        }
      }
    };
    fetchInitialData();
    return () => {};
  }, [dispatch, isFocused, hasFetched]);

  if (isInitialLoading) {
    return (
      <ViewContainer>
        <Spinner
          visible={true}
          textContent={t('RecipeList.Loading')}
        />
      </ViewContainer>
    );
  }

  return (
    <ViewContainer>
      {recipes.length === 0 ? (
        <BlankStateComponent
          screenName="Recipes"
          navigation={navigation}
        />
      ) : (
        <RecipesComponent navigation={navigation} />
      )}
    </ViewContainer>
  );
};

const ViewContainer = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

export default RecipesScreen;
