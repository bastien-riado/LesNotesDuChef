import React, { useMemo } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { COLORS, TYPO } from '../../globals/styles';
import { Recipe } from '../../models/RecipeModels';
import { RecipesState } from '../../models/RecipesStateModels';
import { Mode, UserProfilState } from '../../models/UserProfilStateModels';

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
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const isInDeleteSelectionMode = useSelector(
    (state: { recipes: RecipesState }) => state.recipes.isInDeleteSelectionMode,
  );
  const themedStyle = useMemo(() => styles(mode), [mode]);

  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      style={themedStyle.recipeContainer}
      onLongPress={() => handleLongPress()}
      delayLongPress={300}
    >
      <ImageBackground
        source={{
          uri: recipe.image || 'https://via.placeholder.com/150',
        }}
        style={themedStyle.imageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={themedStyle.recipeInfoContainer}>
          <View>
            <RecipeInfoText
              icon={null}
              text={recipe.name}
              style={[themedStyle.infoText, themedStyle.nameContainer]}
            />
            <RecipeInfoText
              icon="clock-time-four-outline"
              text={recipe.time}
              style={[themedStyle.infoText, themedStyle.infoContainer]}
            />
            <RecipeInfoText
              icon="weight-lifter"
              text={recipe.difficulty}
              style={[themedStyle.infoText, themedStyle.infoContainer]}
            />
          </View>
          {isInDeleteSelectionMode && (
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color={COLORS.TEXTCOLOR[mode]}
              onPress={() => {
                handleCheckboxPress(!checked);
              }}
            />
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const RecipeInfoText = ({
  icon,
  text,
  style,
}: {
  icon: string | null;
  text: string;
  style: any;
}) => (
  <Text style={style}>
    {icon && (
      <MaterialCommunityIcons
        name={icon}
        size={TYPO.ICONSIZE.SMALL}
      />
    )}{' '}
    {text}
  </Text>
);

const styles = (mode: Mode) =>
  StyleSheet.create({
    recipeContainer: {
      margin: 20,
      marginBottom: 5,
      borderRadius: 10,
      elevation: 5,
      height: 200,
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 10,
      overflow: 'hidden',
    },
    recipeInfoContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoText: {
      fontSize: 16,
      marginBottom: 8,
      alignSelf: 'flex-start',
      color: COLORS.TEXTCOLOR[mode],
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
      borderRadius: 20,
      padding: 2,
      elevation: 5,
      marginLeft: 10,
    },
    nameContainer: {
      top: -40,
      paddingLeft: 10,
      paddingRight: 10,
    },
    infoContainer: {
      paddingLeft: 6,
      paddingRight: 10,
      bottom: -50,
    },
  });

export default RecipeCardComponent;
