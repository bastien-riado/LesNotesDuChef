import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { deleteRecipe } from '../services/RecipeService';

const RecipeDetailsScreen = ({ route, navigation }: any) => {
  const handleDelete = async () => {
    await deleteRecipe(recipe);
    navigation.goBack();
  };

  const { recipe }: { recipe: Recipe } = route.params;
  const { t } = useTranslation();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );

  const themedStyle = styles(mode);
  return (
    <View style={themedStyle.container}>
      <ScrollView>
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
        <View style={themedStyle.bottomContainer}>
          <PaperButton
            icon="delete"
            onPress={handleDelete}
            mode="elevated"
            buttonColor={COLORS.BGDELETE}
            textColor={COLORS.TEXTCOLOR.dark}
            uppercase={true}
          >
            {t('RecipeList.Recipe.Delete')}
          </PaperButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: COLORS.BGCOLOR[mode],
    },
    bottomContainer: {
      marginTop: 16,
      marginBottom: 16,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: COLORS.TEXTCOLOR[mode],
    },
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

export default RecipeDetailsScreen;
