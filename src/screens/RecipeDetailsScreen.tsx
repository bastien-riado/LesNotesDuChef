import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import RecipeDetailsComponent from '../components/RecipeDetailsComponent';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';

const RecipeDetailsScreen: React.FC = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);

  return (
    <View style={themedStyle.container}>
      <RecipeDetailsComponent />
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

export default RecipeDetailsScreen;
