import React, { useCallback } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { RecipeState } from '../../models/RecipeStateModels';
import { removeRecipeThunk } from '../../store/recipes/thunks';
import { AppDispatch } from '../../store/store';
import ConfirmModalComponent from '../custom/modal/ConfirmModalComponent/ConfirmModalComponent';
import RecipePreviewComponent from '../RecipePreviewComponent/RecipePreviewComponent';
import { BottomContainer, Container, Loader, StyledImage } from './styles';

const RecipeDetailsComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const recipe = useSelector(
    (state: { recipe: RecipeState }) => state.recipe.currentRecipe,
  );
  const navigation = useNavigation();

  const handleDeletePress = useCallback(async () => {
    toggleModal();
    setIsLoading(true);
    await dispatch(removeRecipeThunk(recipe));
    setIsLoading(false);
    navigation.goBack();
  }, [dispatch, recipe, navigation]);

  const toggleModal = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);

  return (
    <View>
      {isLoading && (
        <Loader
          visible={isLoading}
          textContent={t('NewRecipe.ByHand.Loading')}
        />
      )}
      <ScrollView>
        <StyledImage
          source={{ uri: recipe.image || 'https://via.placeholder.com/150' }}
          resizeMode="cover"
        />
        <Container>
          <RecipePreviewComponent recipe={recipe} />
          <BottomContainer
            icon="delete"
            onPress={() => toggleModal()}
            mode="elevated"
            uppercase={true}
          >
            {t('RecipeList.Recipe.Delete')}
          </BottomContainer>
        </Container>
      </ScrollView>
      <ConfirmModalComponent
        isModalVisible={isModalVisible}
        warningText={t('RecipeList.DeleteModalText')}
        cancelButtonLabel={t('RecipeList.CancelButton')}
        confirmButtonLabel={t('RecipeList.DeleteButton')}
        confirmIcon="alert-remove-outline"
        handleModalCancel={toggleModal}
        handleModalConfirm={handleDeletePress}
      />
    </View>
  );
};

export default RecipeDetailsComponent;
