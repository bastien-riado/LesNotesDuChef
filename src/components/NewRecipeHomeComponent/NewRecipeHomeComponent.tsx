import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import { ButtonGradient, ButtonText, Container, StyledButton } from './styles';

interface NewRecipeHomeComponentProps {
  navigation: any;
}

const NewRecipeHomeComponent: React.FC<NewRecipeHomeComponentProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <GradientButton onPress={() => navigation.navigate('NewRecipeByHand')}>
        <ButtonText>{t('NewRecipe.Selection.ByHand')}</ButtonText>
      </GradientButton>
      <GradientButton onPress={() => navigation.navigate('NewRecipeGenerated')}>
        <ButtonText>{t('NewRecipe.Selection.Generated')}</ButtonText>
      </GradientButton>
      <GradientButton onPress={() => navigation.navigate('NewRecipeByVision')}>
        <ButtonText>{t('NewRecipe.Selection.Vision')}</ButtonText>
      </GradientButton>
    </Container>
  );
};

const GradientButton = ({ children, onPress }: any) => {
  const theme = useTheme();
  return (
    <StyledButton onPress={onPress}>
      <ButtonGradient colors={theme.linearGradient}>{children}</ButtonGradient>
    </StyledButton>
  );
};

export default NewRecipeHomeComponent;
