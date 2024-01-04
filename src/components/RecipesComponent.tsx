import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import RecipeComponent from './RecipeComponent';
import { Recipe } from '../models/RecipeModels';
import { RecipesStackNavigation } from '../navigation/RecipesStackNavigator';
import { COLORS } from '../globals/styles';
import { Mode } from '../models/themeStateModels';
import { useSelector } from 'react-redux';
import { getRecipes } from '../services/RecipeService';

interface RescipesComponentProps {
  navigation: RecipesStackNavigation;
}

const RecipesComponent: React.FC<RescipesComponentProps> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mode: Mode = useSelector((state: any) => state.theme.mode);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const recipes = await getRecipes();
          setRecipes(recipes)
        } catch (error) {
          console.error('Error in getRecipesSerivce:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []));

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Chargement des recettes...'}
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
  }
});

export default RecipesComponent;
