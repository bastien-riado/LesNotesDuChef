import React from 'react';
import { useTranslation } from 'react-i18next';
import { Ingredient } from '../../../models/IngredientModels';
import { Recipe } from '../../../models/RecipeModels';
import EditIngredientsComponent from '../EditIngredientsComponent/EditIngredientsComponent';
import { Container, StyledTextInput } from './styles';

interface EditRecipeFieldsComponentProps {
  recipe: Recipe;
  handleChangeText: (key: keyof Recipe, value: string) => void;
  handleIngredientsChange: (newIngredients: Ingredient[]) => void;
}

/**
 * Represents a component for writing a recipe.
 *
 * @component
 * @param {EditRecipeFieldsComponentProps} props - The component props.
 * @param {Recipe} props.recipe - The recipe object.
 * @param {Function} props.handleChangeText - The function to handle text changes.
 * @returns {JSX.Element} The JSX element representing the EditRecipeFieldsComponent.
 */
const EditRecipeFieldsComponent: React.FC<EditRecipeFieldsComponentProps> = ({
  recipe,
  handleChangeText,
  handleIngredientsChange,
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
      <EditIngredientsComponent
        initialIngredients={recipe.ingredients}
        onIngredientsChange={(ingredients) => handleIngredientsChange(ingredients)}
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

export default EditRecipeFieldsComponent;
