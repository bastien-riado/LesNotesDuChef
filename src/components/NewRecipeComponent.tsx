import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import { Recipe } from '../models/RecipeModels';
import { TabNavigation } from '../navigation/tabNavigation/BottomTabNavigator';
import { Button } from '@react-native-material/core';
import { postNewRecipe } from '../services/RecipeService';
import { Mode } from '../models/themeStateModels';
import { COLORS } from '../globals/styles';
import { useSelector } from 'react-redux';

interface NewRecipeComponentProps {
  navigation: TabNavigation;
}


const NewRecipeComponent: React.FC<NewRecipeComponentProps> = ({ navigation }) => {

  const mode: Mode = useSelector((state: any) => state.theme.mode);
  const themedStyle = styles(mode)

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
    await postNewRecipe(recipe).then(
      (recipeId: string | null) => {
        if (recipeId) {
          setRecipe({
            name: '',
            description: '',
            time: '',
            difficulty: ''
          });

          navigation.navigate('RecipesStack');
        }
      }).catch(console.error);
  }

  return (
    <View>
      <TextInput
        style={themedStyle.input}
        onChangeText={(text) => handleChangeText('name', text)}
        value={recipe.name}
        placeholder="Nom"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={themedStyle.input}
        onChangeText={(text) => handleChangeText('time', text)}
        value={recipe.time}
        placeholder="Temps"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={themedStyle.input}
        onChangeText={(text) => handleChangeText('difficulty', text)}
        value={recipe.difficulty}
        placeholder="Difficulté"
        placeholderTextColor="#A9A9A9"
        multiline={true}
      />
      <TextInput
        style={themedStyle.multiLineInput}
        onChangeText={(text) => handleChangeText('description', text)}
        value={recipe.description}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
      />
      <Button
        title="Enregistrer"
        onPress={handleSaveButton}
      />
    </View>
  );
};

const styles = (mode: Mode) => StyleSheet.create({
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
});

export default NewRecipeComponent;
