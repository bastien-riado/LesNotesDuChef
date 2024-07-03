import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import React from 'react';

interface RecipePreviewComponentProps {
  recipe: Recipe;
  displayName?: boolean;
}

const RecipePreviewComponent: React.FC<RecipePreviewComponentProps> = ({
  recipe,
  displayName,
}) => {
  const { t } = useTranslation();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);

  return (
    <View>
      <View style={themedStyle.infoContainer}>
        {displayName && (
          <>
            <Text style={themedStyle.label}>{t('RecipeList.Recipe.Name')}:</Text>
            <Text style={themedStyle.value}>{recipe.name}</Text>
          </>
        )}
      </View>
      <View style={themedStyle.infoContainer}>
        <Text style={themedStyle.label}>{t('RecipeList.Recipe.Time')}:</Text>
        <Text style={themedStyle.value}>{recipe.time}</Text>
      </View>
      <View style={themedStyle.infoContainer}>
        <Text style={themedStyle.label}>{t('RecipeList.Recipe.Difficulty')}:</Text>
        <Text style={themedStyle.value}>{recipe.difficulty}</Text>
      </View>
      <View>
        <Text style={themedStyle.label}>{t('RecipeList.Recipe.Description')}</Text>
        <Text style={themedStyle.value}>{recipe.description}</Text>
      </View>
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.TEXTCOLOR[mode],
    },
    value: {
      fontSize: 16,
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default RecipePreviewComponent;
