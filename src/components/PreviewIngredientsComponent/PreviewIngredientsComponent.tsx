import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Easing } from 'react-native';
import { useTheme } from 'styled-components';
import { TYPO } from '../../globals/styles';
import { Ingredient } from '../../models/IngredientModels';
import {
  AnimatedIcon,
  AnimatedIngredientsList,
  BlankStateContainer,
  BlankStateIcon,
  BlankStateText,
  Container,
  Icon,
  IngredientText,
  PressableIngredient,
  ReadyText,
  ReadyView,
  Tytle,
} from './styles';

interface PreviewIngredientsProps {
  ingredients: Ingredient[];
}

const PreviewIngredientsComponent: React.FC<PreviewIngredientsProps> = ({
  ingredients,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const toggleIngredientSelection = (ingredientName: string) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(
        selectedIngredients.filter((name) => name !== ingredientName),
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };
  const theme = useTheme();
  const { t } = useTranslation();
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (selectedIngredients.length !== ingredients.length) {
      if (!animationRef.current) {
        animationRef.current = Animated.loop(
          Animated.sequence([
            Animated.timing(borderColorAnim, {
              toValue: 1,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(borderColorAnim, {
              toValue: 0,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]),
        );
        animationRef.current.start();
      }
    } else {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
      borderColorAnim.setValue(-1);
    }
  }, [selectedIngredients.length, ingredients.length]);

  const borderColor = borderColorAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [theme.backgroundSecondary, 'red', 'blue'],
  });

  return (
    <Container>
      <Tytle>{t('RecipeList.Recipe.Ingredients.Title')}:</Tytle>
      {ingredients.length === 0 ? (
        <BlankStateContainer>
          <BlankStateIcon
            name="alert-circle-outline"
            size={TYPO.ICONSIZE.LARGE}
          />
          <BlankStateText>{t('RecipeList.Recipe.Ingredients.Blankstate')}</BlankStateText>
        </BlankStateContainer>
      ) : (
        <>
          <AnimatedIngredientsList style={{ borderColor }}>
            {ingredients.map((ingredient, index) => (
              <PressableIngredient
                key={index}
                isFirst={index === 0}
                isLast={index === ingredients.length - 1}
                isSelected={selectedIngredients.includes(ingredient.name)}
                onPress={() => toggleIngredientSelection(ingredient.name)}
              >
                <IngredientText>{ingredient.name}</IngredientText>
                {selectedIngredients.includes(ingredient.name) && (
                  <Icon
                    name="check-circle-outline"
                    size={TYPO.ICONSIZE.MEDIUM}
                  />
                )}
              </PressableIngredient>
            ))}
          </AnimatedIngredientsList>
          <ReadyView>
            {selectedIngredients.length === ingredients.length && (
              <AnimatedIcon
                name="arrow-down-bold"
                size={TYPO.ICONSIZE.MEDIUM}
              />
            )}
            <ReadyText>
              {selectedIngredients.length === ingredients.length
                ? t('RecipeList.Recipe.Ingredients.Ready')
                : t('RecipeList.Recipe.Ingredients.NotReady')}
            </ReadyText>
            {selectedIngredients.length === ingredients.length && (
              <AnimatedIcon
                name="arrow-down-bold"
                size={TYPO.ICONSIZE.MEDIUM}
              />
            )}
          </ReadyView>
        </>
      )}
    </Container>
  );
};

export default PreviewIngredientsComponent;
