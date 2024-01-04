import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Recipe } from '../models/RecipeModels';
import { RecipesStackNavigation } from '../navigation/RecipesStackNavigator';
import { COLORS } from '../globals/styles';
import { Mode } from '../models/themeStateModels';
import { useSelector } from 'react-redux';

interface RecipeComponentProps {
  recipe: Recipe;
  navigation: RecipesStackNavigation;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe, navigation }) => {
  const handlePress = () => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  const mode: Mode = useSelector((state: any) => state.theme.mode);
  const themedStyle = styles(mode);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={themedStyle.recipeContainer}>
        <Text style={themedStyle.recipeText}>{recipe.name}</Text>
        <Text style={themedStyle.recipeText}>Temps: {recipe.time}</Text>
        <Text style={themedStyle.recipeText}>Difficulté: {recipe.difficulty}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (mode: Mode) => StyleSheet.create({
  recipeContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 8,
    elevation: 10,
    backgroundColor: COLORS.BG_SECONDARYCOLOR[mode]
  },
  recipeText: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.TEXTCOLOR[mode],
  }
});

export default RecipeComponent;
