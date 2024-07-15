import { Text } from '@react-native-material/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button as PaperButton } from 'react-native-paper';
import styled from 'styled-components/native';

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
  const { t } = useTranslation();

  const handleNewRecipe = () => {
    navigation.navigate('NewRecipeStack', {
      screen: 'NewRecipeHome',
    });
  };

  return (
    <>
      {screenName === 'Recipes' && (
        <StyledImageBackground
          source={require('../../assets/img/blankstate_recipes_list.png')}
          resizeMode="contain"
        >
          <StyledText>{t('RecipeList.BlankState')}</StyledText>
          <StyledPaperButton
            icon="pencil-plus-outline"
            onPress={() => handleNewRecipe()}
            mode="elevated"
            uppercase={true}
          >
            {t('RecipeList.AddButton')}
          </StyledPaperButton>
        </StyledImageBackground>
      )}
      {emptyList && <CenteredText>{t('RecipeList.EmptyList')}</CenteredText>}
    </>
  );
};

const StyledImageBackground = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const StyledText = styled(Text)`
  text-align: center;
  margin-top: 50%;
  color: ${(props) => props.theme.text};
`;

const CenteredText = styled(Text)`
  text-align: center;
  padding-top: 50%;
  color: ${(props) => props.theme.text};
`;

const StyledPaperButton = styled(PaperButton).attrs((props) => ({
  buttonColor: props.theme.button,
  textColor: props.theme.text,
}))`
  width: 80%;
  align-self: center;
  margin-top: 250px;
`;

export default BlankStateComponent;
