import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Svg, { Ellipse } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { COLORS } from '../globals/styles';
import { ICONSIZE } from '../globals/styles/typography';
import { RecipesState } from '../models/RecipesStateModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { removeRecipesSelectedThunk } from '../store/recipes/thunks';
import { AppDispatch } from '../store/store';
import RecipeComponent from './RecipeComponent';
import BlankStateComponent from './custom/BlankStateComponent';
import ConfirmModalComponent from './custom/modal/ConfirmModalComponent/ConfirmModalComponent';

export interface RecipesComponentProps {
  navigation: any;
}

const RecipesComponent: React.FC<RecipesComponentProps> = memo(({ navigation }) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { recipes, isInDeleteSelectionMode, inDeleteSelection } = useSelector(
    (state: { recipes: RecipesState }) => state.recipes,
  );
  const dispatch = useDispatch<AppDispatch>();
  const slideAnim = useRef(new Animated.Value(100)).current;
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchBarAnim = useRef(new Animated.Value(0)).current;
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleDeletePress = useCallback(async () => {
    toggleModal();
    await dispatch(removeRecipesSelectedThunk(inDeleteSelection));
  }, [inDeleteSelection, dispatch]);

  const toggleModal = useCallback(() => {
    if (inDeleteSelection.length > 0) {
      setIsModalVisible((prev) => !prev);
    }
  }, [inDeleteSelection]);

  const filteredRecipes = useMemo(() => {
    return searchQuery === ''
      ? recipes
      : recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
  }, [searchQuery, recipes]);

  useEffect(() => {
    const finalValue = isInDeleteSelectionMode ? 0 : 100;
    Animated.timing(slideAnim, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isInDeleteSelectionMode, slideAnim]);

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY <= 0) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY < prevScrollY) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY > prevScrollY) {
      Animated.timing(searchBarAnim, {
        toValue: -70,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    setPrevScrollY(currentScrollY);
  };

  return (
    <Container mode={mode}>
      <SearchBarContainer style={{ transform: [{ translateY: searchBarAnim }] }}>
        <Searchbar
          placeholder={t('RecipeList.SearchPlaceholder')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          iconColor={COLORS.ICONCOLOR[mode]}
          elevation={5}
          inputStyle={{
            color: COLORS.TEXTCOLOR[mode],
          }}
          style={{
            margin: 10,
            backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
          }}
        />
      </SearchBarContainer>
      {filteredRecipes.length !== 0 && (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          style={{ paddingTop: 55 }}
          renderItem={({ item }) => (
            <RecipeComponent
              recipe={item}
              navigation={navigation}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 100 }}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={21}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      )}
      {filteredRecipes.length === 0 && (
        <BlankStateComponent
          navigation={navigation}
          emptyList={true}
        />
      )}
      {isInDeleteSelectionMode && (
        <EllipseContainer style={{ transform: [{ translateY: slideAnim }] }}>
          <EllipseButton
            onPress={toggleModal}
            disabled={inDeleteSelection.length === 0}
          >
            <Svg
              height="100"
              width="100%"
            >
              <Ellipse
                cx="50%"
                cy="100%"
                rx="70%"
                ry="100"
                fill={COLORS.BGDELETE}
              />
            </Svg>
            <ButtonContent>
              <Icon
                name="trash-can-outline"
                size={ICONSIZE.MEDIUM}
                mode={mode}
              />
              <ButtonText mode={mode}>{t('RecipeList.DeleteSelectedButton')}</ButtonText>
            </ButtonContent>
          </EllipseButton>
        </EllipseContainer>
      )}
      <ConfirmModalComponent
        isModalVisible={isModalVisible}
        warningText={t('RecipeList.DeleteModalText')}
        cancelButtonLabel={t('RecipeList.CancelButton')}
        confirmButtonLabel={t('RecipeList.DeleteButton')}
        confirmIcon="alert-remove-outline"
        handleModalCancel={toggleModal}
        handleModalConfirm={handleDeletePress}
      />
    </Container>
  );
});

const Container = styled.View<{ mode: Mode }>`
  flex: 1;
  width: 100%;
  background-color: ${(props) => COLORS.BG_PRIMARYCOLOR[props.mode]};
`;

const SearchBarContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1;
`;

const EllipseContainer = styled(Animated.View)`
  width: 100%;
  height: 100px;
  bottom: -30px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const EllipseButton = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ListContainer = styled.View`
  padding-horizontal: 0;
  padding-bottom: 100px;
`;

const ButtonContent = styled.View`
  align-items: center;
  position: absolute;
  bottom: 40px;
`;

const ButtonText = styled.Text<{ mode: Mode }>`
  color: ${(props) => COLORS.TEXTCOLOR[props.mode]};
  font-weight: bold;
`;

const Icon = styled(MaterialCommunityIcons)<{ mode: Mode }>`
  color: ${(props) => COLORS.ICONCOLOR[props.mode]};
  margin-right: 10px;
`;

export default RecipesComponent;
