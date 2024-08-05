import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Recipe } from '../../models/RecipeModels';
import { RecipeState } from '../../models/RecipeStateModels';
import { updateRecipeThunk } from '../../store/recipes/thunks';
import { AppDispatch } from '../../store/store';
import WriteRecipeComponent from '../custom/WriteRecipeComponent/WriteRecipeComponent';
import ConfirmModalComponent from '../custom/modal/ConfirmModalComponent/ConfirmModalComponent';
import { BottomContainer, Container, Loader } from './styles';

const EditRecipeComponent: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const recipe = useSelector(
    (state: { recipe: RecipeState }) => state.recipe.currentRecipe,
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editedRecipe, setEditedRecipe] = useState<Recipe>({
    ...recipe,
    name: recipe.name,
    description: recipe.description,
    time: recipe.time,
    difficulty: recipe.difficulty,
  });
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    setIsModalVisible(true);
    return true;
  };

  const handleModalGoBack = () => {
    setIsModalVisible(false);
    dispatch({ type: 'TOGGLE_MODIFICATION' });
    navigation.goBack();
  };

  const handleSaveEdition = async () => {
    setIsLoading(true);
    await dispatch(updateRecipeThunk(editedRecipe));
    setIsLoading(false);
    dispatch({ type: 'TOGGLE_MODIFICATION' });
    navigation.goBack();
  };

  const handleChangeText = (key: keyof Recipe, value: string) => {
    setEditedRecipe({ ...editedRecipe, [key]: value });
  };

  return (
    <Container>
      {isLoading && (
        <Loader
          visible={isLoading}
          textContent={t('RecipeList.EditRecipe.Loading')}
        />
      )}
      <ScrollView>
        <View>
          <WriteRecipeComponent
            recipe={editedRecipe}
            handleChangeText={(key, value) => handleChangeText(key, value)}
          />
          <BottomContainer
            icon="content-save-outline"
            onPress={() => handleSaveEdition()}
            mode="elevated"
            uppercase={true}
          >
            {t('RecipeList.EditRecipe.Save')}
          </BottomContainer>
        </View>
      </ScrollView>
      <ConfirmModalComponent
        isModalVisible={isModalVisible}
        warningText={t('RecipeList.EditRecipe.Modal.WarningText')}
        cancelButtonLabel={t('RecipeList.EditRecipe.Modal.CancelButton')}
        confirmButtonLabel={t('RecipeList.EditRecipe.Modal.ConfirmButton')}
        handleModalCancel={closeModal}
        handleModalConfirm={handleModalGoBack}
      />
    </Container>
  );
};

export default EditRecipeComponent;
