import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button as PaperButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { addRecipeThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import WriteRecipeComponent from './custom/WriteRecipeComponent';

interface NewRecipeComponentProps {
  navigation: any;
}

const NewRecipeByHandComponent: React.FC<NewRecipeComponentProps> = ({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = styles(mode);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe>({
    name: '',
    description: '',
    time: '',
    difficulty: '',
  });

  const handleChangeText = (key: keyof Recipe, value: string) => {
    setRecipe({ ...recipe, [key]: value });
  };

  const handleSaveButton = async () => {
    setIsLoading(true);
    const success = await dispatch(addRecipeThunk(recipe));
    setIsLoading(false);
    if (success) {
      navigation.navigate('Recipes');
    }
  };

  return (
    <ScrollView>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={t('NewRecipe.ByHand.Loading')}
          textStyle={themedStyle.textTest}
          color={COLORS.TEXTCOLOR[mode]}
        />
      )}
      <WriteRecipeComponent
        recipe={recipe}
        handleChangeText={(key, value) => handleChangeText(key, value)}
      />
      <PaperButton
        icon="content-save"
        onPress={() => handleSaveButton()}
        mode="elevated"
        buttonColor={COLORS.BUTTONCOLOR[mode]}
        textColor={COLORS.TEXTCOLOR[mode]}
        style={{ width: '80%', alignSelf: 'center', marginBottom: 4 }}
      >
        {t('NewRecipe.Save')}
      </PaperButton>
    </ScrollView>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    input: {
      width: '100%',
      marginBottom: 12,
      color: COLORS.TEXTCOLOR[mode],
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
    },

    multiLineInput: {
      width: '100%',
      marginBottom: 12,
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
      minHeight: 64,
      textAlignVertical: 'top',
    },
    textTest: {
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default NewRecipeByHandComponent;
