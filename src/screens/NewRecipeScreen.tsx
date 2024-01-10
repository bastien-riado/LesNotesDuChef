import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import React = require('react');

import { COLORS } from '../globals/styles/index';
import NewRecipeComponent from '../components/NewRecipeComponent';
import { BottomTabNavigation } from '../navigation/tabNavigation/BottomTabNavigator';
import { Mode } from '../models/themeStateModels';

type NewRecipeScreenProps = {
  navigation: BottomTabNavigation;
}

const NewRecipeScreen: React.FC<NewRecipeScreenProps> = ({ navigation }) => {
  const mode: Mode = useSelector((state: any) => state.theme.mode);
  const themedStyle = styles(mode);
  return (
    <View style={themedStyle.container}>
      <NewRecipeComponent navigation={navigation} />
    </View>
  );
};

const styles = (mode: Mode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.BGCOLOR[mode]
  },
});

export default NewRecipeScreen;
