import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipesStackNavigation } from '../navigation/NewRecipeStackNavigator';
import NewRecipeByVisionComponent from '../components/NewRecipeByVisionComponent';

interface NewRecipeByVisionScreenProps {
  navigation: NewRecipesStackNavigation;
}

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
      padding: 12,
      backgroundColor: COLORS.BGCOLOR[mode],
    },
  });

export default NewRecipeByVisionScreen;
