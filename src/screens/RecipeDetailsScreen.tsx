import { Button } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { dbRef } from '../services/Auth/config/FirebaseConfig';

const RecipeDetailsScreen = ({ route, navigation }: any) => {

  const handleDelete = async () => {
    await dbRef.ref('recipes').child(recipe.id).remove();
    navigation.goBack();
  };

  const { recipe } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la recette</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{recipe.id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nom:</Text>
        <Text style={styles.value}>{recipe.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Temps:</Text>
        <Text style={styles.value}>{recipe.time}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Difficulté:</Text>
        <Text style={styles.value}>{recipe.difficulty}</Text>
      </View>
      <View>
        <Button
          style={styles.button}
          title="Supprimer la recette"
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: 'red',
  },
});

export default RecipeDetailsScreen;
