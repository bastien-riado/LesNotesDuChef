import { Button } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  return (
    <View style={themedStyle.container}>
      <Text style={themedStyle.title}>Détails de la recette</Text>
      <View style={themedStyle.infoContainer}>
        <Text style={themedStyle.label}>ID:</Text>
        <Text style={themedStyle.value}>{recipe.id}</Text>
      </View>
      <View style={themedStyle.infoContainer}>
        <Text style={themedStyle.label}>Nom:</Text>
        <Text style={themedStyle.value}>{recipe.name}</Text>
      </View>
      <View style={themedStyle.infoContainer}>
        <Text style={themedStyle.label}>Temps:</Text>
        <Text style={themedStyle.value}>{recipe.time}</Text>
      </View>
      <View style={themedStyle.infoContainer}>
        <Text style={themedStyle.label}>Difficulté:</Text>
        <Text style={themedStyle.value}>{recipe.difficulty}</Text>
      </View>
      <View>
        <Button
          style={themedStyle.button}
          title="Supprimer la recette"
          onPress={handleDelete}
        />
      </View>
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
    button: {
      backgroundColor: 'red',
    },
  });

export default RecipeDetailsScreen;
