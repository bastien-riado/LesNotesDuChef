import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { RecipesState } from '../models/RecipesStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';
import { RecipesStackNavigation } from '../navigation/RecipesStackNavigator';
import { getRecipes } from '../services/RecipeService';
import RecipeComponent from './RecipeComponent';

interface RescipesComponentProps {
  navigation: RecipesStackNavigation;
}

const RecipesComponent: React.FC<RescipesComponentProps> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );

  const fetchRecipesFromStore = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.recipes,
  );

  //appel que si on check le stoire et qu'il est vide sinon utiliser le store
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const recipes = await getRecipes();
          setRecipes(recipes);
        } catch (error) {
          console.error('Error in getRecipesSerivce:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, []),
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
            key={item.id}
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
