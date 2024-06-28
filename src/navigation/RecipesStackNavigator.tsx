import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { RecipeState } from '../models/RecipeStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import RecipesScreen from '../screens/RecipesScreen';
import { RootStackParamList } from './NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const RecipesStackNavigator = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const recipeName = useSelector(
    (state: { recipe: RecipeState }) => state.recipe.currentRecipe.name,
  );
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.BG_SECONDARYCOLOR[mode] },
        headerTitleStyle: { color: COLORS.TEXTCOLOR[mode] },
      }}
    >
      <Stack.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{ title: t('RecipeList.Title') }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{ title: recipeName }}
      />
    </Stack.Navigator>
  );
};

export default RecipesStackNavigator;
