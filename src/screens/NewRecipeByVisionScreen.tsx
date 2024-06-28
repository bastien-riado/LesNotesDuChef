import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import NewRecipeByVisionComponent from '../components/NewRecipeByVisionComponent';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipeByVisionScreenProps } from '../navigation/NavigationTypes';

const NewRecipeByVisionScreen: React.FC<NewRecipeByVisionScreenProps> = ({
  navigation,
}) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  return (
    <View style={themedStyle.container}>
      <NewRecipeByVisionComponent navigation={navigation} />
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

export default NewRecipeByVisionScreen;
