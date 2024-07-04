import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { COLORS } from '../../globals/styles';
import { Recipe } from '../../models/RecipeModels';
import { Mode, UserProfilState } from '../../models/UserProfilStateModels';

interface WriteRecipeComponentProps {
  recipe: Recipe;
  handleChangeText: (key: keyof Recipe, value: string) => void;
}

/**
 * Represents a component for writing a recipe.
 *
 * @component
 * @param {WriteRecipeComponentProps} props - The component props.
 * @param {Recipe} props.recipe - The recipe object.
 * @param {Function} props.handleChangeText - The function to handle text changes.
 * @returns {JSX.Element} The JSX element representing the WriteRecipeComponent.
 */
const WriteRecipeComponent: React.FC<WriteRecipeComponentProps> = ({
  recipe,
  handleChangeText,
}) => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();
  const themedStyle = styles(mode);
  return (
    <View>
      <TextInput
        label={t('NewRecipe.Name')}
        value={recipe.name}
        onChangeText={(text) => handleChangeText('name', text)}
        style={themedStyle.input}
        mode="outlined"
        textColor={COLORS.TEXTCOLOR[mode]}
      />
      <TextInput
        label={t('NewRecipe.Time')}
        value={recipe.time}
        onChangeText={(text) => handleChangeText('time', text)}
        style={themedStyle.input}
        mode="outlined"
        textColor={COLORS.TEXTCOLOR[mode]}
      />
      <TextInput
        label={t('NewRecipe.Difficulty')}
        value={recipe.difficulty}
        onChangeText={(text) => handleChangeText('difficulty', text)}
        style={themedStyle.input}
        mode="outlined"
        textColor={COLORS.TEXTCOLOR[mode]}
      />
      <TextInput
        label={t('NewRecipe.Description')}
        value={recipe.description}
        onChangeText={(text) => handleChangeText('description', text)}
        style={themedStyle.multiLineInput}
        mode="outlined"
        multiline={true}
        numberOfLines={18}
        textColor={COLORS.TEXTCOLOR[mode]}
        verticalAlign="top"
      />
    </View>
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
  });

export default WriteRecipeComponent;
