import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
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
      <StyledButton onPress={() => navigation.navigate('NewRecipeByHand')}>
        <ButtonText>{t('NewRecipe.Selection.ByHand')}</ButtonText>
      </StyledButton>
      <StyledButton onPress={() => navigation.navigate('NewRecipeGenerated')}>
        <ButtonText>{t('NewRecipe.Selection.Generated')}</ButtonText>
      </StyledButton>
      <StyledButton onPress={() => navigation.navigate('NewRecipeByVision')}>
        <ButtonText>{t('NewRecipe.Selection.Vision')}</ButtonText>
      </StyledButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const StyledButton = styled.TouchableOpacity`
  height: 60px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-color: ${(props) => props.theme.text};
  border-radius: 10px;
  margin-vertical: 10px;
  elevation: 5;
  background-color: ${(props) => props.theme.backgroundSecondary};
`;

const ButtonText = styled.Text`
  font-size: ${FONTSIZE.LARGE}px;
  color: ${(props) => props.theme.text};
`;

export default NewRecipeHomeComponent;
