import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { UserProfilState } from '../models/UserProfilStateModels';
import NewRecipeByHandScreen from '../screens/NewRecipeByHandScreen';
import NewRecipeByVisionScreen from '../screens/NewRecipeByVisionScreen';
import NewRecipeGeneratedScreen from '../screens/NewRecipeGeneratedScreen';
import NewRecipeScreen from '../screens/NewRecipeHomeScreen';
import { RootStackParamList } from './NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const NewRecipeStackNavigator = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.BG_SECONDARYCOLOR[mode] },
        headerTitleStyle: { color: COLORS.TEXTCOLOR[mode] },
        title: t('NewRecipe.Title'),
      }}
    >
      <Stack.Screen
        name="NewRecipeHome"
        component={NewRecipeScreen}
      />
      <Stack.Screen
        name="NewRecipeByHand"
        component={NewRecipeByHandScreen}
      />
      <Stack.Screen
        name="NewRecipeGenerated"
        component={NewRecipeGeneratedScreen}
      />
      <Stack.Screen
        name="NewRecipeByVision"
        component={NewRecipeByVisionScreen}
      />
    </Stack.Navigator>
  );
};

export default NewRecipeStackNavigator;
