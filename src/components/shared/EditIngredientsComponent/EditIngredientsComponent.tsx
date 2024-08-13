import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TYPO } from '../../../globals/styles';
import { Ingredient } from '../../../models/IngredientModels';
import {
  AddButton,
  Container,
  CustomBottomSheetModal,
  Icon,
  IngredientName,
  IngredientsList,
  Input,
  ItemText,
  MenuItem,
  MenuItemText,
  MenuScrollView,
  PressableItem,
  SubMenuContainer,
  Text,
} from './styles';

interface EditIngredientsComponentProps {
  initialIngredients?: Ingredient[];
  onIngredientsChange: (newIngredients: Ingredient[]) => void;
}

const IngredientsComponent: React.FC<EditIngredientsComponentProps> = ({
  initialIngredients,
  onIngredientsChange,
}) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState(initialIngredients ?? []);
  const [showInput, setShowInput] = useState(false);
  const [editIngredientIndex, setEditIngredientIndex] = useState<number | null>(null);
  const [selectedIngredientIndex, setSelectedIngredientIndex] = useState<number | null>(
    null,
  );
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const addItemToList = () => {
    if (name.trim().length > 0) {
      let updatedIngredients: Ingredient[];
      if (editIngredientIndex !== null) {
        updatedIngredients = [...ingredients];
        updatedIngredients[editIngredientIndex] = { name: name.trim() };
        setEditIngredientIndex(null);
      } else {
        updatedIngredients = [...ingredients, { name: name.trim() }];
      }
      setIngredients(updatedIngredients);
      onIngredientsChange(updatedIngredients);
      setName('');
      setShowInput(false);
    } else {
      if (editIngredientIndex !== null) {
        const updatedIngredients = ingredients.filter(
          (_, i) => i !== editIngredientIndex,
        );
        setIngredients(updatedIngredients);
        onIngredientsChange(updatedIngredients);
        setEditIngredientIndex(null);
      }
      setName('');
      setShowInput(false);
    }
  };

  const handleAddButtonPress = () => {
    setShowInput(true);
  };

  const handleItemPress = (index: number) => {
    setSelectedIngredientIndex(index);
    handlePresentModalPress();
  };

  const editItem = () => {
    if (selectedIngredientIndex !== null) {
      bottomSheetModalRef.current?.close();
      setTimeout(() => {
        setName(ingredients[selectedIngredientIndex].name);
        setEditIngredientIndex(selectedIngredientIndex);
        setShowInput(true);
      }, 50);
    }
  };

  const deleteItem = () => {
    if (selectedIngredientIndex !== null) {
      const updatedIngredients = ingredients.filter(
        (_, i) => i !== selectedIngredientIndex,
      );
      setIngredients(updatedIngredients);
      onIngredientsChange(updatedIngredients);
      bottomSheetModalRef.current?.close();
    }
  };

  const ingredientsOptions = [
    { text: t('RecipeList.EditRecipe.Ingredients.Options.Edit'), onPress: editItem },
    { text: t('RecipeList.EditRecipe.Ingredients.Options.Delete'), onPress: deleteItem },
    {
      text: t('RecipeList.EditRecipe.Ingredients.Options.Cancel'),
      onPress: () => bottomSheetModalRef.current?.close(),
    },
  ];

  return (
    <Container>
      <IngredientsList>
        {ingredients.length > 0 && (
          <Text>{t('RecipeList.EditRecipe.Ingredients.Title')}:</Text>
        )}
        {ingredients.length === 0 ? (
          <Text>{t('RecipeList.EditRecipe.Ingredients.EmptyList')}</Text>
        ) : (
          ingredients.map((ingredient, index) => (
            <React.Fragment key={index}>
              {editIngredientIndex === index ? (
                <Input
                  autoFocus={true}
                  placeholder={t('RecipeList.EditRecipe.Ingredients.Placeholder')}
                  value={name}
                  onChangeText={setName}
                  onBlur={addItemToList}
                />
              ) : (
                <PressableItem
                  isFirst={index === 0}
                  isLast={index === ingredients.length - 1}
                  onPress={() => handleItemPress(index)}
                >
                  <ItemText>{ingredient.name}</ItemText>
                </PressableItem>
              )}
            </React.Fragment>
          ))
        )}
      </IngredientsList>

      {showInput && editIngredientIndex === null ? (
        <Input
          autoFocus={true}
          placeholder={t('RecipeList.EditRecipe.Ingredients.Placeholder')}
          value={name}
          onChangeText={setName}
          onBlur={addItemToList}
        />
      ) : (
        <AddButton onPress={handleAddButtonPress}>
          <Icon
            name="plus"
            size={TYPO.ICONSIZE.MEDIUM}
          />
        </AddButton>
      )}

      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <MenuScrollView>
          <IngredientName>
            {selectedIngredientIndex !== null && ingredients[selectedIngredientIndex]
              ? ingredients[selectedIngredientIndex].name
              : ''}
          </IngredientName>
          <SubMenuContainer>
            {ingredientsOptions.map((option, index) => (
              <MenuItem
                key={index}
                onPress={option.onPress}
              >
                <MenuItemText>{option.text}</MenuItemText>
              </MenuItem>
            ))}
          </SubMenuContainer>
        </MenuScrollView>
      </CustomBottomSheetModal>
    </Container>
  );
};

export default IngredientsComponent;
