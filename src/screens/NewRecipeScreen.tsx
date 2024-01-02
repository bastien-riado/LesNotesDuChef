import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import React = require('react');

import { COLORS } from '../globals/styles/index';
import NewRecipeComponent from '../components/NewRecipeComponent';
import { TabNavigation } from '../navigation/tabNavigation/BottomTabNavigator';

interface NewRecipeScreenProps {
  navigation: TabNavigation;
}

const NewRecipeScreen: React.FC<NewRecipeScreenProps> = ({ navigation }) => {
  const theme = useSelector((state: any) => state.theme.mode);

  return (
    <View style={[styles.container, theme === 'light' ? styles.light : styles.dark]}>
      <NewRecipeComponent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  light: {
    backgroundColor: COLORS.BGCOLOR.LIGHT,
  },
  dark: {
    backgroundColor: COLORS.BGCOLOR.DARK,
  },
});

export default NewRecipeScreen;
