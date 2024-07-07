import { Text } from '@react-native-material/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { COLORS } from '../../globals/styles';
import { Mode, UserProfilState } from '../../models/UserProfilStateModels';

interface BlankStateProps {
  navigation: any;
  screenName?: string;
  emptyList?: boolean;
}
/**
 * A component that displays a blank state for the screen passed in the props.
 *
 * @component
 * @param {object} navigation - The navigation object used to navigate to other screens.
 * @param {string} screenName - The name of the current screen.
 * @param {boolean} emptyList - A boolean that indicates if the list is empty.
 * @returns {JSX.Element} The rendered component.
 */
const BlankStateComponent: React.FC<BlankStateProps> = ({
  navigation,
  screenName,
  emptyList,
}) => {
  const mode: Mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();
  const themedStyle = styles(mode);

  const handleNewRecipe = () => {
    navigation.navigate('NewRecipeStack', {
      screen: 'NewRecipeHome',
    });
  };

  return (
    <>
      {screenName === 'Recipes' && (
        <ImageBackground
          source={require('../../assets/img/blankstate_recipes_list.png')}
          style={themedStyle.imageBackground}
          resizeMode="contain"
        >
          <Text style={themedStyle.text}>{t('RecipeList.BlankState')}</Text>
          <PaperButton
            icon="pencil-plus-outline"
            onPress={() => handleNewRecipe()}
            mode="elevated"
            buttonColor={COLORS.BUTTONCOLOR[mode]}
            textColor={COLORS.TEXTCOLOR[mode]}
            uppercase={true}
            style={{ width: '80%', alignSelf: 'center', marginTop: 250 }}
          >
            {t('RecipeList.AddButton')}
          </PaperButton>
        </ImageBackground>
      )}
      {emptyList && (
        <Text style={themedStyle.centeredText}>{t('RecipeList.EmptyList')}</Text>
      )}
    </>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    imageBackground: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },
    text: {
      textAlign: 'center',
      marginTop: '50%',
      color: COLORS.TEXTCOLOR[mode],
    },
    centeredText: {
      textAlign: 'center',
      paddingTop: '50%',
      color: COLORS.TEXTCOLOR[mode],
    },
    header: {
      color: '#6c757d',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    },
  });

export default BlankStateComponent;
