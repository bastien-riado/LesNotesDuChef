import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import { Button as PaperButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { RecipeState } from '../models/RecipeStateModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { updateRecipeThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import WriteRecipeComponent from './custom/WriteRecipeComponent';

const EditRecipeComponent = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const navigation = useNavigation();
  const themedStyle = styles(mode);
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
  const toggleModal = () => setIsModalVisible(!isModalVisible);

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

  const handleModalConfirm = () => {
    setIsModalVisible(false);
    dispatch({ type: 'TOGGLE_MODIFICATION' });
    navigation.goBack();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
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
    <View style={themedStyle.container}>
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
          <PaperButton
            style={themedStyle.bottomContainer}
            icon="content-save-outline"
            onPress={() => handleSaveEdition()}
            mode="elevated"
            buttonColor={COLORS.BUTTONCOLOR[mode]}
            textColor={COLORS.TEXTCOLOR[mode]}
            uppercase={true}
          >
            {t('RecipeList.Recipe.SaveEdit')}
          </PaperButton>
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationInTiming={300}
        animationOut="zoomOut"
        animationOutTiming={300}
        backdropColor="black"
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        useNativeDriver={true}
      >
        <View style={themedStyle.modalView}>
          <Text style={themedStyle.text}>{t('RecipeList.DeleteModalText')}</Text>
          <View style={themedStyle.modalButtonView}>
            <TouchableOpacity
              onPress={() => handleModalCancel()}
              style={[themedStyle.modalButton, themedStyle.close]}
            >
              <Text style={themedStyle.buttonText}>{t('RecipeList.CancelButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleModalConfirm()}
              style={[themedStyle.modalButton, themedStyle.delete]}
            >
              <Text style={themedStyle.buttonText}>{t('RecipeList.DeleteButton')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 12,
      paddingRight: 12,
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },
    bottomContainer: {
      margin: 20,
    },
    text: {
      color: COLORS.TEXTCOLOR[mode],
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
    },
    buttonText: {
      color: COLORS.TEXTCOLOR[mode],
      fontWeight: 'bold',
    },
    modalView: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
      borderRadius: 10,
      maxHeight: 200,
    },
    modalButtonView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    modalButton: {
      padding: 15,
      paddingLeft: 40,
      paddingRight: 40,
      borderRadius: 10,
      backgroundColor: COLORS.WARNING,
    },
    close: {
      backgroundColor: COLORS.BUTTONCOLOR[mode],
      elevation: 5,
    },
    delete: {
      backgroundColor: COLORS.BGDELETE,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
    },
  });

export default EditRecipeComponent;
