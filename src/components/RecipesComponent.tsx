import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RecipesState } from '../models/RecipesStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';
import RecipeComponent from './RecipeComponent';

export interface RecipesComponentProps {
  navigation: any;
}

const RecipesComponent: React.FC<RecipesComponentProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipes = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.recipes,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <RecipeComponent
            recipe={item}
            navigation={navigation}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
  },
  listContainer: {
    paddingHorizontal: 0,
  },
});

export default RecipesComponent;
