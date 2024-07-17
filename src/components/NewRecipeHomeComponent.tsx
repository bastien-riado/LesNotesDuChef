import React from 'react';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import styled, { useTheme } from 'styled-components/native';
import { FONTSIZE } from '../globals/styles/typography';

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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const GradientButton = ({ children, onPress }: any) => {
  const theme = useTheme();
  return (
    <StyledButton onPress={onPress}>
      <ButtonGradient colors={theme.linearGradient}>{children}</ButtonGradient>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  height: 150px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-vertical: 10px;
  elevation: 5;
`;

const ButtonGradient = styled(LinearGradient)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  font-size: ${FONTSIZE.LARGE}px;
  color: ${(props) => props.theme.text};
`;

export default NewRecipeHomeComponent;
