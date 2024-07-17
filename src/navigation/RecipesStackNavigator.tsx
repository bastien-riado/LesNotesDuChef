import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
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
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageOptionsVisible, setImageOptionsVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const translateX = useSharedValue(0);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setImageOptionsVisible(false);
    }
  }, []);

  const handleChevronPress = useCallback(() => {
    setImageOptionsVisible(false);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleChangeImagePress = () => {
    runOnJS(setImageOptionsVisible)(true);
    translateX.value = withTiming(
      -400,
      {
        duration: 200,
        easing: Easing.out(Easing.exp),
      },
      () => {
        translateX.value = 300;
        translateX.value = withTiming(0, {
          duration: 200,
          easing: Easing.out(Easing.exp),
        });
      },
    );
  };

  const handleChangeImageBackPress = () => {
    runOnJS(setImageOptionsVisible)(false);
    translateX.value = withTiming(
      400,
      {
        duration: 200,
        easing: Easing.out(Easing.exp),
      },
      () => {
        translateX.value = -300;
        translateX.value = withTiming(0, {
          duration: 200,
          easing: Easing.out(Easing.exp),
        });
      },
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

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
      icon: 'chevron-right',
      onPress: handleChangeImagePress,
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
  const imageSnapPoint = imageOptions.length * 12.5 + 2 + '%';
  const snapPoints = useMemo(
    () => ['3%', isImageOptionsVisible ? imageSnapPoint : snapPoint],
    [isImageOptionsVisible],
  );

  const CustomHandle = ({ onPress }: any) => {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{ backgroundColor: 'lightgrey', borderRadius: 50 }}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color={COLORS.ICONCOLOR.light}
          />
        </TouchableOpacity>
      </View>
    );
  };

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
          handleComponent={
            isImageOptionsVisible
              ? () => <CustomHandle onPress={handleChangeImageBackPress} />
              : undefined
          }
        >
          <CustomBottomSheetView>
            <SubMenuContainer style={animatedStyle}>
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
                      <MenuItemContainer>
                        <MenuItemText>{option.text}</MenuItemText>
                        {option.icon && <MenuItemIcon name={option.icon} />}
                      </MenuItemContainer>
                    </MenuItem>
                  ))}
            </SubMenuContainer>
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
  handleIndicatorStyle: {
    backgroundColor: props.theme.text,
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

const MenuItemContainer = styled.View`
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const MenuItemIcon = styled(MaterialCommunityIcons).attrs((props) => ({
  size: ICONSIZE.MEDIUM,
  color: props.theme.text,
}))`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-${ICONSIZE.MEDIUM / 2}px);
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

const SubMenuContainer = styled(Animated.View)`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

export default RecipesStackNavigator;
