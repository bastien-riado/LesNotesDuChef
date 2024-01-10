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
import RecipeService from '../services/RecipeService';

interface RescipesComponentProps {
  navigation: RecipesStackNavigation;
}

const RecipesComponent: React.FC<RescipesComponentProps> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mode: Mode = useSelector((state: any) => state.theme.mode);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      RecipeService.getRecipes()
        .then(recipes => setRecipes(recipes))
        .finally(() => setIsLoading(false));
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
        keyExtractor={(recipe) => recipe.id!}
        renderItem={({ item: recipe }) => (
          <RecipeComponent
            key={recipe.id}
            recipe={recipe}
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
