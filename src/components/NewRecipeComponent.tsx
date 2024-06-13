import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { NewRecipesStackNavigation } from '../navigation/NewRecipeStackNavigator';
interface NewRecipeComponentProps {
  navigation: NewRecipesStackNavigation;
}

const NewRecipeComponent: React.FC<NewRecipeComponentProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  const { t } = useTranslation();

  return (
    <View style={themedStyle.container}>
      <TouchableOpacity
        style={themedStyle.button}
        onPress={() => navigation.navigate('NewRecipeByHand')}
      >
        <Text style={themedStyle.buttonText}>{t('NewRecipe.Selection.ByHand')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={themedStyle.button}
        onPress={() => navigation.navigate('NewRecipeGenerated')}
      >
        <Text style={themedStyle.buttonText}>{t('NewRecipe.Selection.Generated')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={themedStyle.button}
        onPress={() => navigation.navigate('NewRecipeByVision')}
      >
        <Text style={themedStyle.buttonText}>{t('NewRecipe.Selection.Vision')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.BGCOLOR[mode],
    },
    button: {
      height: 60,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: COLORS.TEXTCOLOR[mode],
      borderRadius: 10,
      marginVertical: 10,
      elevation: 5,
      backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
    },
    buttonText: {
      fontSize: 18,
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default NewRecipeComponent;
