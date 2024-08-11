import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList } from 'react-native';
import Svg from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { ICONSIZE } from '../../globals/styles/typography';
import { RecipesState } from '../../models/RecipesStateModels';
import { removeRecipesSelectedThunk } from '../../store/recipes/thunks';
import { AppDispatch } from '../../store/store';
import BlankStateComponent from '../shared/BlankStateComponent/BlankStateComponent';
import ConfirmModalComponent from '../shared/modal/ConfirmModalComponent/ConfirmModalComponent';

import RecipeComponent from '../RecipeComponent/RecipeComponent';
import {
  ButtonContent,
  ButtonText,
  Container,
  CustomEllipse,
  CustomSearchbar,
  EllipseButton,
  EllipseContainer,
  Icon,
  SearchBarContainer,
} from './styles';

export interface RecipesComponentProps {
  navigation: any;
}

const RecipesComponent: React.FC<RecipesComponentProps> = memo(({ navigation }) => {
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
    <Container>
      <SearchBarContainer style={{ transform: [{ translateY: searchBarAnim }] }}>
        <CustomSearchbar
          placeholder={t('RecipeList.SearchPlaceholder')}
          onChangeText={setSearchQuery}
          value={searchQuery}
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
              <CustomEllipse
                cx="50%"
                cy="100%"
                rx="70%"
                ry="100"
              />
            </Svg>
            <ButtonContent>
              <Icon
                name="trash-can-outline"
                size={ICONSIZE.MEDIUM}
              />
              <ButtonText>{t('RecipeList.DeleteSelectedButton')}</ButtonText>
            </ButtonContent>
          </EllipseButton>
        </EllipseContainer>
      )}
      <ConfirmModalComponent
        isModalVisible={isModalVisible}
        warningText={t('RecipeList.DeleteModalText', {
          count: inDeleteSelection.length,
        })}
        cancelButtonLabel={t('RecipeList.CancelButton')}
        confirmButtonLabel={t('RecipeList.DeleteButton')}
        confirmIcon="alert-remove-outline"
        handleModalCancel={toggleModal}
        handleModalConfirm={handleDeletePress}
      />
    </Container>
  );
});

export default RecipesComponent;
