import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { TYPO } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';

interface RecipePreviewComponentProps {
  recipe: Recipe;
  displayName?: boolean;
}

const RecipePreviewComponent: React.FC<RecipePreviewComponentProps> = ({
  recipe,
  displayName,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      {displayName && (
        <InfoContainer>
          <Label>{t('RecipeList.Recipe.Name')}:</Label>
          <Value>{recipe.name}</Value>
        </InfoContainer>
      )}
      <InfoContainer>
        <Label>{t('RecipeList.Recipe.Time')}:</Label>
        <Value>{recipe.time}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>{t('RecipeList.Recipe.Difficulty')}:</Label>
        <Value>{recipe.difficulty}</Value>
      </InfoContainer>
      <DescriptionContainer>
        <Label>{t('RecipeList.Recipe.Description')}</Label>
        <Value>{recipe.description}</Value>
      </DescriptionContainer>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 12px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DescriptionContainer = styled.View`
  margin-top: 8px;
`;

const Label = styled.Text`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const Value = styled.Text`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
`;

export default RecipePreviewComponent;
