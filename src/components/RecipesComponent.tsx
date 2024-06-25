import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { RecipesState } from '../models/RecipesStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';
import { fetchRecipesThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import RecipeComponent from './RecipeComponent';

export interface RecipesComponentProps {
  navigation: any;
}

const RecipesComponent: React.FC<RecipesComponentProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );

  const recipes = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.recipes,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetch = async () => {
        if (recipes.length === 0) {
          setIsLoading(true);
          await dispatch(fetchRecipesThunk());
          setIsLoading(false);
        }
      };
      fetch();
    }, [recipes.length, dispatch]),
  );

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={t('RecipeList.Loading')}
        textStyle={{ color: COLORS.TEXTCOLOR[mode] }}
      />

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <RecipeComponent
            recipe={item}
            navigation={navigation}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
  },
  listContainer: {
    paddingHorizontal: 0,
  },
});

export default RecipesComponent;
