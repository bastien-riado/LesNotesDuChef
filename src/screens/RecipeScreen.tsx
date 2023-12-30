import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import RecipesComponent from '../components/RecipesComponent';

const RecipeScreen = () => {
  const theme = useSelector((state: any) => state.theme.mode);

  //a globaliser
  const gradientColors =
    theme === 'light' ? ['#E0F7FA', '#FFFFFF'] : ['#663399', '#000000'];

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
    >
      <RecipesComponent />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecipeScreen;
