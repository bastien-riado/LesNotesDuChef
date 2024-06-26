import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

import React = require('react');

import NewRecipeGeneratedComponent from '../components/NewRecipeGeneratedComponent';
import { COLORS } from '../globals/styles/index';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipeGeneratedScreenProps } from '../navigation/NavigationTypes';

const NewRecipeGeneratedScreen: React.FC<NewRecipeGeneratedScreenProps> = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  return (
    <View style={themedStyle.container}>
      <NewRecipeGeneratedComponent />
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },
  });

export default NewRecipeGeneratedScreen;
