import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { Menu } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModalComponent from '../components/custom/modal/ConfirmModalComponent';
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

  const handleModalConfirm = ({ navigation }: any) => {
    setIsModalVisible(false);
    dispatch({ type: 'TOGGLE_MODIFICATION' });
    navigation.goBack();
  };

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const dotMenu = ({ navigation }: any) => {
    return (
      <View>
        <Menu
          visible={isMenuVisible}
          onDismiss={() => closeMenu()}
          style={{ marginTop: 20 }}
          anchorPosition="bottom"
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
          headerTitle: recipeName,
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

export default RecipesStackNavigator;
