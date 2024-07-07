import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { RecipesState } from '../models/RecipesStateModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { AppDispatch } from '../store/store';
import RecipeCardComponent from './custom/RecipeCardComponent';

interface RecipeComponentProps {
  recipe: Recipe;
  navigation: any;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe, navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const themedStyle = styles(mode);
  const isInDeleteSelectionMode = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.isInDeleteSelectionMode,
  );

  useEffect(() => {
    if (!isInDeleteSelectionMode) {
      setChecked(false);
    }
  }, [isInDeleteSelectionMode]);

  const handlePress = () => {
    dispatch({ type: 'SET_RECIPE', payload: recipe });
    navigation.navigate('RecipeDetails');
  };

  const handleLongPress = () => {
    dispatch({
      type: 'CLEAR_DELETE_SELECTION',
    });
    dispatch({
      type: 'IS_IN_DELETE_SELECTION_MODE',
      payload: !isInDeleteSelectionMode,
    });
    setChecked(true);
    dispatch({
      type: 'ADD_TO_DELETE_SELECTION',
      payload: recipe,
    });
  };

  const handleCheckboxPress = (checked: boolean) => {
    setChecked(checked);
    if (checked) {
      dispatch({
        type: 'ADD_TO_DELETE_SELECTION',
        payload: recipe,
      });
    } else {
      dispatch({
        type: 'REMOVE_FROM_DELETE_SELECTION',
        payload: recipe,
      });
    }
  };

  return (
    <RecipeCardComponent
      recipe={recipe}
      handlePress={handlePress}
      handleLongPress={handleLongPress}
      handleCheckboxPress={handleCheckboxPress}
      checked={checked}
    />
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    recipeContainer: {
      padding: 10,
      margin: 10,
      marginBottom: 5,
      marginLeft: 16,
      marginRight: 16,
      borderRadius: 10,
      elevation: 5,
      borderColor: COLORS.TEXTCOLOR[mode],
      backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
    },
    recipeInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    recipeText: {
      fontSize: 16,
      marginBottom: 8,
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default RecipeComponent;
