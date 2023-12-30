import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const GLOBAL = require('../globals/styles/colors.tsx');

const HomeScreen = () => {
  const theme = useSelector((state: any) => state.theme.mode);

  return (
    <View style={theme === 'light' ? styles.container_light : styles.container_dark}>
      <Text style={theme === 'light' ? styles.text_light : styles.text_dark}>
        Bienvenue sur Les Notes du Chef, ici vous pourrez créer vos propre recettes et les
        détailler comme bon vous semble
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    backgroundColor: GLOBAL.BGCOLOR.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container_dark: {
    flex: 1,
    backgroundColor: GLOBAL.BGCOLOR.DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text_light: {
    marginBottom: 20,
    color: GLOBAL.TEXTCOLOR.LIGHT,
  },

  text_dark: {
    marginBottom: 20,
    color: GLOBAL.TEXTCOLOR.DARK,
  },

  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    color: 'black',
  },
});

export default HomeScreen;
