import React from 'react';
import { View } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import styled from 'styled-components/native';

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
          textStyle={{ fontSize: 16, fontWeight: 'bold', color: COLORS.TEXTCOLOR[mode] }}
          color={COLORS.TEXTCOLOR[mode]}
        />
      )}
      <ScrollView>
        <StyledImage
          source={{ uri: recipe.image || 'https://via.placeholder.com/150' }}
          resizeMode="cover"
        />
        <Container>
          <RecipePreviewComponent recipe={recipe} />
          <BottomContainer
            icon="delete"
            onPress={() => handleDelete()}
            mode="elevated"
            buttonColor={COLORS.BGDELETE}
            textColor={COLORS.TEXTCOLOR.dark}
            uppercase={true}
          >
            {t('RecipeList.Recipe.Delete')}
          </BottomContainer>
        </Container>
      </ScrollView>
    </View>
  );
};

const Container = styled.View`
  padding-left: 12px;
  padding-right: 12px;
`;

const BottomContainer = styled(PaperButton)`
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: center;
`;

const Title = styled.Text<{ mode: Mode }>`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${(props) => COLORS.TEXTCOLOR[props.mode]};
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Label = styled.Text<{ mode: Mode }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => COLORS.TEXTCOLOR[props.mode]};
`;

const Value = styled.Text<{ mode: Mode }>`
  font-size: 16px;
  color: ${(props) => COLORS.TEXTCOLOR[props.mode]};
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 250px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export default RecipeDetailsComponent;
