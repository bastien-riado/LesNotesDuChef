import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Recipe } from '../models/RecipeModels';
import { RecipesState } from '../models/RecipesStateModels';
import { AppDispatch } from '../store/store';
import RecipeCardComponent from './custom/RecipeCardComponent';

interface RecipeComponentProps {
  recipe: Recipe;
  navigation: any;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe, navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
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

export default RecipeComponent;
