import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { Recipe } from '../../models/RecipeModels';

interface WriteRecipeComponentProps {
  recipe: Recipe;
  handleChangeText: (key: keyof Recipe, value: string) => void;
}

/**
 * Represents a component for writing a recipe.
 *
 * @component
 * @param {WriteRecipeComponentProps} props - The component props.
 * @param {Recipe} props.recipe - The recipe object.
 * @param {Function} props.handleChangeText - The function to handle text changes.
 * @returns {JSX.Element} The JSX element representing the WriteRecipeComponent.
 */
const WriteRecipeComponent: React.FC<WriteRecipeComponentProps> = ({
  recipe,
  handleChangeText,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <StyledTextInput
        label={t('NewRecipe.Name')}
        value={recipe.name}
        onChangeText={(text) => handleChangeText('name', text)}
        mode="outlined"
      />
      <StyledTextInput
        label={t('NewRecipe.Time')}
        value={recipe.time}
        onChangeText={(text) => handleChangeText('time', text)}
        mode="outlined"
      />
      <StyledTextInput
        label={t('NewRecipe.Difficulty')}
        value={recipe.difficulty}
        onChangeText={(text) => handleChangeText('difficulty', text)}
        mode="outlined"
      />
      <StyledTextInput
        label={t('NewRecipe.Description')}
        value={recipe.description}
        onChangeText={(text) => handleChangeText('description', text)}
        mode="outlined"
        multiline={true}
        numberOfLines={18}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const StyledTextInput = styled(TextInput).attrs((props) => ({
  textColor: props.theme.text,
}))`
  width: 100%;
  margin-bottom: 12px;
  background-color: ${(props) => props.theme.backgroundPrimary};
  color: ${(props) => props.theme.text};
`;

export default WriteRecipeComponent;
