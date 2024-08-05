import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CenteredText,
  StyledImageBackground,
  StyledPaperButton,
  StyledText,
} from './styles';

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
          source={require('../../../assets/img/blankstate_recipes_list.png')}
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

export default BlankStateComponent;
