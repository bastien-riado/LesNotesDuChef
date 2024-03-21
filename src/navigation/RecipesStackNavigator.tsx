import { NavigationProp, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Recipe } from '../models/RecipeModels';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import RecipesScreen from '../screens/RecipesScreen';

export type RecipeStackScreenNames = ['Recipes', 'RecipeDetails'];
export type RecipeStackParamList = Record<
  RecipeStackScreenNames[number],
  { recipe: Recipe } | undefined
>;
export type RecipesStackNavigation = NavigationProp<RecipeStackParamList>;
const Stack = createStackNavigator<RecipeStackParamList>();

const navigationOptions = (mode: Mode) => {
  type NavigationOpts = {
    route: RouteProp<RecipeStackParamList, RecipeStackScreenNames[number]>;
    navigation: any;
  };
  const { t } = useTranslation();
  return (props: NavigationOpts) => {
    const {
      route,
    }: { route: RouteProp<RecipeStackParamList, RecipeStackScreenNames[number]> } = props;
    return {
      title: route.name === 'Recipes' ? t('RecipeList.Title') : route.params?.recipe.name,
      headerStyle: {
        backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
      },
      headerTitleStyle: {
        color: COLORS.TEXTCOLOR[mode],
      },
    };
  };
};

const RecipesStackNavigator = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  return (
    <Stack.Navigator
      screenOptions={navigationOptions(mode)}
      initialRouteName="Recipes"
    >
      <Stack.Screen
        name="Recipes"
        component={RecipesScreen}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default RecipesStackNavigator;
