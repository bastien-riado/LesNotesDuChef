import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import EditRecipeComponent from '../components/EditRecipeComponent';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';

const EditRecipeScreen: React.FC = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);

  return (
    <View style={themedStyle.container}>
      <EditRecipeComponent />
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

export default EditRecipeScreen;
