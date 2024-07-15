import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import ConfirmModalComponent from '../components/custom/modal/ConfirmModalComponent';
import { COLORS } from '../globals/styles';
import { FONTSIZE, ICONSIZE } from '../globals/styles/typography';
import { RecipeState } from '../models/RecipeStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';
import EditRecipeScreen from '../screens/EditRecipeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import RecipesScreen from '../screens/RecipesScreen';
import {
  handleImageSelection,
  openCamera,
  openGallery,
} from '../services/ImageSelectionService';
import { updateRecipeImageThunk } from '../store/recipe/thunks';
import { useAppDispatch } from '../store/store';
import { RootStackParamList } from './NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const RecipesStackNavigator = () => {
  const dispatch = useAppDispatch();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipe = useSelector(
    (state: { recipe: RecipeState }) => state.recipe.currentRecipe,
  );
  const uid = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.uid,
  );
  const isInEdition = useSelector(
    (state: { recipe: RecipeState }) => state.recipe.isInEdition,
  );
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageOptionsVisible, setImageOptionsVisible] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setImageOptionsVisible(false);
    }
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const dotMenuOptions = [
    {
      text: t('RecipeList.Recipe.OptionsMenu.Edit'),
      onPress: ({ navigation }: any) => {
        bottomSheetModalRef.current?.close();
        setTimeout(() => {
          navigation.navigate('EditRecipe');
          dispatch({ type: 'TOGGLE_MODIFICATION' });
        }, 0);
      },
    },
    {
      text: t('RecipeList.Recipe.OptionsMenu.ChangeImage'),
      onPress: () => {
        setImageOptionsVisible(true);
      },
    },
  ];
  const imageOptions = [
    {
      text: t('UserProfil.Settings.ImageModal.TakeButton'),
      onPress: () => openCamera(handleImageSelectionCallback),
    },
    {
      text: t('UserProfil.Settings.ImageModal.ChooseButton'),
      onPress: () => openGallery(handleImageSelectionCallback),
    },
  ];
  const nbOptions = dotMenuOptions.length;
  const snapPoint = nbOptions * 12.5 + '%';
  const imageSnapPoint = imageOptions.length * 12.5 + '%';
  const snapPoints = useMemo(
    () => ['3%', isImageOptionsVisible ? imageSnapPoint : snapPoint],
    [isImageOptionsVisible],
  );

  const handleImageSelectionCallback = (response: any) => {
    handleImageSelection(
      response,
      uid,
      setIsModalVisible,
      async (downloadURL: string) => {},
      (downloadURL: string) => {
        dispatch(updateRecipeImageThunk(recipe, downloadURL));
        bottomSheetModalRef.current?.close();
      },
      (error: any) => console.error('Error uploading image: ', error),
    );
  };

  const handleModalConfirm = ({ navigation }: any) => {
    setIsModalVisible(false);
    dispatch({ type: 'TOGGLE_MODIFICATION' });
    navigation.goBack();
  };

  const dotMenu = ({ navigation }: any) => {
    return (
      <View>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={{ marginRight: 10 }}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={ICONSIZE.MEDIUM}
            color={COLORS.ICONCOLOR[mode]}
          />
        </TouchableOpacity>
        <CustomBottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableDynamicSizing
        >
          <CustomBottomSheetView>
            {isImageOptionsVisible
              ? imageOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    onPress={option.onPress}
                  >
                    <MenuItemText>{option.text}</MenuItemText>
                  </MenuItem>
                ))
              : dotMenuOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    onPress={() => option.onPress({ navigation })}
                  >
                    <MenuItemText>{option.text}</MenuItemText>
                  </MenuItem>
                ))}
          </CustomBottomSheetView>
        </CustomBottomSheetModal>
      </View>
    );
  };

  const confirmModal = ({ navigation }: any) => {
    return (
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <MaterialCommunityIcons
          name="close"
          size={ICONSIZE.MEDIUM}
          style={{ marginLeft: 10, color: COLORS.ICONCOLOR[mode] }}
        />
        <ConfirmModalComponent
          isModalVisible={isModalVisible}
          warningText={t('RecipeList.EditRecipe.Modal.WarningText')}
          cancelButtonLabel={t('RecipeList.EditRecipe.Modal.CancelButton')}
          confirmButtonLabel={t('RecipeList.EditRecipe.Modal.ConfirmButton')}
          handleModalCancel={() => setIsModalVisible(false)}
          handleModalConfirm={() => handleModalConfirm({ navigation })}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.BG_SECONDARYCOLOR[mode] },
        headerTitleStyle: { color: COLORS.TEXTCOLOR[mode] },
      }}
    >
      <Stack.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{ title: t('RecipeList.Title') }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={({ navigation }) => ({
          headerTitle: recipe.name,
          headerRight: () => dotMenu({ navigation }),
          headerBackImage: () => (
            <MaterialCommunityIcons
              name="chevron-left"
              size={ICONSIZE.MEDIUM}
              color={COLORS.ICONCOLOR[mode]}
            />
          ),
        })}
      />
      <Stack.Screen
        name="EditRecipe"
        component={EditRecipeScreen}
        options={({ navigation }) => ({
          title: t('RecipeList.EditRecipe.Title'),
          headerLeft: () => confirmModal({ navigation }),
        })}
      />
    </Stack.Navigator>
  );
};

const CustomBottomSheetModal = styled(BottomSheetModal).attrs((props) => ({
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundStyle: {
    backgroundColor: props.theme.backgroundPrimary,
  },
}))``;

const MenuItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: 20px;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundSecondary};
`;

const MenuItemText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;

const CustomBottomSheetView = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

export default RecipesStackNavigator;
