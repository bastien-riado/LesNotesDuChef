import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button as PaperButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Recipe } from '../models/RecipeModels';
import { addRecipeThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import WriteRecipeComponent from './custom/WriteRecipeComponent';

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
    <ScrollView>
      {isLoading && (
        <CustomSpinner
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
        mode="contained"
      >
        {t('NewRecipe.Save')}
      </StyledButton>
    </ScrollView>
  );
};

const StyledButton = styled(PaperButton).attrs((props) => ({
  buttonColor: props.theme.button,
  textColor: props.theme.text,
}))`
  width: 80%;
  align-self: center;
  margin-bottom: 4px;
  button-color: ${(props) => props.theme.button};
  text-color: ${(props) => props.theme.text};
`;

const CustomSpinner = styled(Spinner).attrs((props) => ({
  textStyle: { color: props.theme.text },
  color: props.theme.text,
}))``;

export default NewRecipeByHandComponent;
