import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import React = require('react');

import NewRecipeComponent from '../components/NewRecipeHomeComponent';
import { COLORS } from '../globals/styles/index';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipeHomeScreenProps } from '../navigation/NavigationTypes';

const NewRecipeHomeScreen: React.FC<NewRecipeHomeScreenProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  return (
    <View style={themedStyle.container}>
      <NewRecipeComponent navigation={navigation} />
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

export default NewRecipeHomeScreen;
