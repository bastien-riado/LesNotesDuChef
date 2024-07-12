import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { RecipeState } from '../models/RecipeStateModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { removeRecipeThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import RecipePreviewComponent from './RecipePreviewComponent';

const RecipeDetailsComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipe = useSelector(
    (state: { recipe: RecipeState }) => state.recipe.currentRecipe,
  );
  const navigation = useNavigation();
  const themedStyle = useMemo(() => styles(mode), [mode]);

  const handleDelete = async () => {
    setIsLoading(true);
    await dispatch(removeRecipeThunk(recipe));
    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <View>
      {isLoading && (
        <Spinner
          visible={isLoading}
          textContent={t('NewRecipe.ByHand.Loading')}
          textStyle={themedStyle.label}
          color={COLORS.TEXTCOLOR[mode]}
        />
      )}
      <ScrollView>
        <Image
          source={{ uri: recipe.image || 'https://via.placeholder.com/150' }}
          style={themedStyle.image}
          resizeMode="cover"
        />
        <View style={themedStyle.container}>
          <RecipePreviewComponent recipe={recipe} />
          <PaperButton
            style={themedStyle.bottomContainer}
            icon="delete"
            onPress={() => handleDelete()}
            mode="elevated"
            buttonColor={COLORS.BGDELETE}
            textColor={COLORS.TEXTCOLOR.dark}
            uppercase={true}
          >
            {t('RecipeList.Recipe.Delete')}
          </PaperButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    bottomContainer: {
      marginTop: 16,
      marginBottom: 16,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: COLORS.TEXTCOLOR[mode],
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.TEXTCOLOR[mode],
    },
    value: {
      fontSize: 16,
      color: COLORS.TEXTCOLOR[mode],
    },
    image: {
      width: '100%',
      height: 250,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
  });

export default RecipeDetailsComponent;
