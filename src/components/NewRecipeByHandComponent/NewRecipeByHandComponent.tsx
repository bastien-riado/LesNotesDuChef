import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Recipe } from '../../models/RecipeModels';
import { addRecipeThunk } from '../../store/recipes/thunks';
import { AppDispatch } from '../../store/store';
import WriteRecipeComponent from '../shared/WriteRecipeComponent/WriteRecipeComponent';
import { Loader, ScrollViewContainer, StyledButton } from './styles';

interface NewRecipeComponentProps {
  navigation: any;
}

const NewRecipeByHandComponent: React.FC<NewRecipeComponentProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe>({
    id: '',
    ownerId: '',
    name: '',
    description: '',
    time: '',
    difficulty: '',
    image: '',
  });

  const handleChangeText = (key: keyof Recipe, value: string) => {
    setRecipe({ ...recipe, [key]: value });
  };

  const handleSaveButton = async () => {
    setIsLoading(true);
    const success = await dispatch(addRecipeThunk(recipe));
    setIsLoading(false);
    if (success) {
      navigation.navigate('Recipes');
    }
  };

  return (
    <ScrollViewContainer>
      {isLoading && (
        <Loader
          visible={isLoading}
          textContent={t('NewRecipe.ByHand.Loading')}
        />
      )}
      <WriteRecipeComponent
        recipe={recipe}
        handleChangeText={(key, value) => handleChangeText(key, value)}
      />
      <StyledButton
        icon="content-save"
        onPress={() => handleSaveButton()}
        mode="elevated"
      >
        {t('NewRecipe.Save')}
      </StyledButton>
    </ScrollViewContainer>
  );
};

export default NewRecipeByHandComponent;
