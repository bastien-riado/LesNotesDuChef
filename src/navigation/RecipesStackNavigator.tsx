import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Menu } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { ICONSIZE } from '../globals/styles/typography';
import { RecipeState } from '../models/RecipeStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';
import EditRecipeScreen from '../screens/EditRecipeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import RecipesScreen from '../screens/RecipesScreen';
import { RootStackParamList } from './NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const RecipesStackNavigator = () => {
  const dispatch = useDispatch();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipeName = useSelector(
    (state: { recipe: RecipeState }) => state.recipe.currentRecipe.name,
  );
  const isInEdition = useSelector(
    (state: { recipe: RecipeState }) => state.recipe.isInEdition,
  );
  const { t } = useTranslation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalCancel = () => {
    closeModal();
  };
  const handleModalConfirm = ({ navigation }: any) => {
    closeModal();
    dispatch({ type: 'TOGGLE_MODIFICATION' });
    navigation.goBack();
  };
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const dotMenu = ({ navigation }: any) => {
    return (
      <View>
        <Menu
          visible={isMenuVisible}
          onDismiss={() => closeMenu()}
          style={{ marginTop: 20 }}
          anchor={
            <TouchableOpacity
              onPress={() => openMenu()}
              style={{ marginRight: 10 }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={ICONSIZE.MEDIUM}
                color={COLORS.ICONCOLOR[mode]}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              isInEdition ? closeMenu() : dispatch({ type: 'TOGGLE_MODIFICATION' });
              closeMenu();
              navigation.navigate('EditRecipe');
            }}
            title={t('RecipeList.Recipe.OptionsMenu.Edit')}
          />
        </Menu>
      </View>
    );
  };

  const confirmModal = ({ navigation }: any) => {
    //Item modal custom component
    return (
      <TouchableOpacity onPress={() => openModal()}>
        <Text>Confirm</Text>
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
          <View>
            <Text>{t('RecipeList.DeleteModalText')}</Text>
            <View>
              <TouchableOpacity onPress={() => handleModalCancel()}>
                <Text>{t('RecipeList.CancelButton')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleModalConfirm({ navigation })}>
                <Text>{t('RecipeList.DeleteButton')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
          title: recipeName,
          headerRight: () => dotMenu({ navigation }),
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

export default RecipesStackNavigator;
