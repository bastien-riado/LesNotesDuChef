import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import React = require('react');

import NewRecipeByHandComponent from '../components/NewRecipeByHandComponent';
import { COLORS } from '../globals/styles/index';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipesStackNavigation } from '../navigation/NewRecipeStackNavigator';

interface NewRecipeScreenProps {
  navigation: NewRecipesStackNavigation;
}

const NewRecipeByHandScreen: React.FC<NewRecipeScreenProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  return (
    <View style={themedStyle.container}>
      <NewRecipeByHandComponent navigation={navigation} />
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },
  });

export default NewRecipeByHandScreen;
