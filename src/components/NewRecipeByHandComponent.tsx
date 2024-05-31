import { Button } from '@react-native-material/core';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
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
              routes: [{ name: 'BottomTabNavigator' }, { name: 'RecipeList' }],
            }),
          );
        }
      })
      .catch(console.error);
  };

  return (
    <View>
      <TextInput
        style={themedStyle.input}
        onChangeText={(text) => handleChangeText('name', text)}
        value={recipe.name}
        placeholder={t('NewRecipe.Name')}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={themedStyle.input}
        onChangeText={(text) => handleChangeText('time', text)}
        value={recipe.time}
        placeholder={t('NewRecipe.Time')}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={themedStyle.input}
        onChangeText={(text) => handleChangeText('difficulty', text)}
        value={recipe.difficulty}
        placeholder={t('NewRecipe.Difficulty')}
        placeholderTextColor="#A9A9A9"
        multiline={true}
      />
      <TextInput
        style={themedStyle.multiLineInput}
        onChangeText={(text) => handleChangeText('description', text)}
        value={recipe.description}
        placeholder={t('NewRecipe.Description')}
        placeholderTextColor="#A9A9A9"
      />
      <Button
        title={t('NewRecipe.Save')}
        onPress={handleSaveButton}
      />
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: COLORS.TEXTCOLOR[mode],
    },

    multiLineInput: {
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: COLORS.TEXTCOLOR[mode],
    },
    textTest: {
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default NewRecipeByHandComponent;
