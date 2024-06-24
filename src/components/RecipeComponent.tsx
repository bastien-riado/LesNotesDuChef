import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';

interface RecipeComponentProps {
  recipe: Recipe;
  navigation: any;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe, navigation }) => {
  const handlePress = () => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();
  const themedStyle = styles(mode);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={themedStyle.recipeContainer}>
        <Text style={themedStyle.recipeText}>{recipe.name}</Text>
        <Text style={themedStyle.recipeText}>
          {t('RecipeList.Recipe.Time')}: {recipe.time}
        </Text>
        <Text style={themedStyle.recipeText}>
          {t('RecipeList.Recipe.Difficulty')}: {recipe.difficulty}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    recipeContainer: {
      padding: 10,
      margin: 10,
      borderRadius: 8,
      elevation: 10,
      backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
    },
    recipeText: {
      fontSize: 16,
      marginBottom: 8,
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default RecipeComponent;
