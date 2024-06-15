import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipesStackNavigation } from '../navigation/NewRecipeStackNavigator';
import { postNewRecipe } from '../services/RecipeService';
interface NewRecipeComponentProps {
  navigation: NewRecipesStackNavigation;
}

const NewRecipeByHandComponent: React.FC<NewRecipeComponentProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  const { t } = useTranslation();

  const [recipe, setRecipe] = useState<Recipe>({
    name: '',
    description: '',
    time: '',
    difficulty: '',
  });

  const handleChangeText = (key: keyof Recipe, value: string) => {
    setRecipe({ ...recipe, [key]: value });
  };

  const handleSaveButton = async () => {
    await postNewRecipe(recipe)
      .then((recipeId: string | null) => {
        if (recipeId) {
          setRecipe({
            name: '',
            description: '',
            time: '',
            difficulty: '',
          });

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'BottomTabNavigator',
                  params: { screen: 'RecipesStack', params: { screen: 'Recipes' } },
                },
              ],
            }),
          );
        }
      })
      .catch(console.error);
  };

  return (
    <ScrollView>
      <TextInput
        label={t('NewRecipe.Name')}
        value={recipe.name}
        onChangeText={(text) => handleChangeText('name', text)}
        style={themedStyle.input}
        mode="outlined"
        textColor={COLORS.TEXTCOLOR[mode]}
      />
      <TextInput
        label={t('NewRecipe.Time')}
        value={recipe.time}
        onChangeText={(text) => handleChangeText('time', text)}
        style={themedStyle.input}
        mode="outlined"
        textColor={COLORS.TEXTCOLOR[mode]}
      />
      <TextInput
        label={t('NewRecipe.Difficulty')}
        value={recipe.difficulty}
        onChangeText={(text) => handleChangeText('difficulty', text)}
        style={themedStyle.input}
        mode="outlined"
        textColor={COLORS.TEXTCOLOR[mode]}
      />
      <TextInput
        label={t('NewRecipe.Description')}
        value={recipe.description}
        onChangeText={(text) => handleChangeText('description', text)}
        style={themedStyle.multiLineInput}
        mode="outlined"
        multiline={true}
        numberOfLines={18}
        textColor={COLORS.TEXTCOLOR[mode]}
        verticalAlign="top"
      />
      <Button
        onPress={handleSaveButton}
        mode="contained"
      >
        {t('NewRecipe.Save')}
      </Button>
    </ScrollView>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    input: {
      width: '100%',
      marginBottom: 12,
      color: COLORS.TEXTCOLOR[mode],
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },

    multiLineInput: {
      width: '100%',
      marginBottom: 12,
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
      minHeight: 64,
      textAlignVertical: 'top',
    },
    textTest: {
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default NewRecipeByHandComponent;
