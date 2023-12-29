import auth from '@react-native-firebase/auth';
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { Recipe } from "../models/RecipeModels";
import { dbRef } from "../services/Auth/config/FirebaseConfig";

const NewRecipeComponent = () => {

  const [recipe, setRecipe] = useState<Recipe>({
    id: '',
    ownerId: auth().currentUser!.uid,
    name: '',
    description: '',
    time: '',
    difficulty: '',
  });

  const handleChangeText = (key: keyof Recipe, value: string) => {
    setRecipe({ ...recipe, [key]: value });
  };

  const handleSaveButton = async () => {
    if (recipe.name && recipe.description && recipe.time && recipe.difficulty) {
      const recipesRef = dbRef.ref('recipes');

      try {
        const newRecipeRef = recipesRef.push();
        const recipeId = newRecipeRef.key;

        if (recipeId) {
          await newRecipeRef.update({
            ...recipe,
            id: recipeId,
          });

          setRecipe({
            ...recipe,
            id: recipeId,
            name: '',
            description: '',
            time: '',
            difficulty: '',
          });
        } else {
          console.error('L\'ID généré par Firebase est null.');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données à Firebase:', error);
      }
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs du formulaire.');
    }
  };



  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChangeText('name', text)}
        value={recipe.name}
        placeholder="Name"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChangeText('description', text)}
        value={recipe.description}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChangeText('time', text)}
        value={recipe.time}
        placeholder="Time"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChangeText('difficulty', text)}
        value={recipe.difficulty}
        placeholder="Difficulty"
        placeholderTextColor="#A9A9A9"
      />
      <Button title="Enregistrer" onPress={handleSaveButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});

export default NewRecipeComponent;
