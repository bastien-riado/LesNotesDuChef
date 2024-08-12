import React from 'react';
import { useTranslation } from 'react-i18next';
import { Recipe } from '../../models/RecipeModels';
import PreviewIngredientsComponent from '../PreviewIngredientsComponent/PreviewIngredientsComponent';
import { Container, DescriptionContainer, InfoContainer, Label, Value } from './styles';

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
      <PreviewIngredientsComponent ingredients={recipe.ingredients} />
      <DescriptionContainer>
        <Label>{t('RecipeList.Recipe.Description')}</Label>
        <Value>{recipe.description}</Value>
      </DescriptionContainer>
    </Container>
  );
};

export default RecipePreviewComponent;
