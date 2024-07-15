import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button as PaperButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { RecipeState } from '../models/RecipeStateModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { updateRecipeThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import WriteRecipeComponent from './custom/WriteRecipeComponent';
import ConfirmModalComponent from './custom/modal/ConfirmModalComponent';

const EditRecipeComponent: React.FC = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
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
    <Container mode={mode}>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={t('RecipeList.EditRecipe.Loading')}
          color={COLORS.TEXTCOLOR[mode]}
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
            buttonColor={COLORS.BUTTONCOLOR[mode]}
            textColor={COLORS.TEXTCOLOR[mode]}
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

const Container = styled.View<{ mode: Mode }>`
  flex: 1;
  padding-left: 12px;
  padding-right: 12px;
  background-color: ${(props) => COLORS.BG_PRIMARYCOLOR[props.mode]};
`;

const BottomContainer = styled(PaperButton)`
  margin: 20px;
`;

export default EditRecipeComponent;
