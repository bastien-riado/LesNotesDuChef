import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Recipe } from '../../../models/RecipeModels';
import { RecipesState } from '../../../models/RecipesStateModels';
import {
  Icon,
  ImageBackgroundContainer,
  InfoText,
  NameText,
  RecipeContainer,
  RecipeInfoContainer,
  RecipeInfoTextContainer,
  StyledCheckbox,
  TouchableOpacityContainer,
} from './styles';

interface RecipeCardComponentProps {
  recipe: Recipe;
  handlePress: () => void;
  handleLongPress: () => void;
  handleCheckboxPress: (checked: boolean) => void;
  checked: boolean;
}

const RecipeCardComponent: React.FC<RecipeCardComponentProps> = ({
  recipe,
  handlePress,
  handleLongPress,
  handleCheckboxPress,
  checked,
}) => {
  const isInDeleteSelectionMode = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.isInDeleteSelectionMode,
  );

  return (
    <TouchableOpacityContainer
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={300}
      activeOpacity={0.6}
    >
      <ImageBackgroundContainer
        source={{
          uri: recipe.image || 'https://via.placeholder.com/150',
        }}
        imageStyle={{ borderRadius: 10 }}
      >
        <RecipeContainer>
          <RecipeInfoContainer>
            <View>
              <RecipeInfoText
                icon={null}
                text={recipe.name}
                isName
              />
            </View>
            <View>
              <RecipeInfoText
                icon="clock-time-four-outline"
                text={recipe.time}
              />
              <RecipeInfoText
                icon="weight-lifter"
                text={recipe.difficulty}
              />
            </View>
          </RecipeInfoContainer>
          {isInDeleteSelectionMode && (
            <StyledCheckbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                handleCheckboxPress(!checked);
              }}
            />
          )}
        </RecipeContainer>
      </ImageBackgroundContainer>
    </TouchableOpacityContainer>
  );
};

const RecipeInfoText = ({
  icon,
  text,
  isName = false,
}: {
  icon: string | null;
  text: string;
  isName?: boolean;
}) => (
  <RecipeInfoTextContainer>
    {icon && <Icon name={icon} />}
    {isName ? <NameText>{text}</NameText> : <InfoText>{text}</InfoText>}
  </RecipeInfoTextContainer>
);

export default RecipeCardComponent;
