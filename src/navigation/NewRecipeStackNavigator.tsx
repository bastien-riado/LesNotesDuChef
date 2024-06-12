import { NavigationProp, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import NewRecipeByHandScreen from '../screens/NewRecipeByHandScreen';
import NewRecipeByVisionScreen from '../screens/NewRecipeByVisionScreen';
import NewRecipeGeneratedScreen from '../screens/NewRecipeGeneratedScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';

export type NewRecipeStackScreenNames = [
  'NewRecipeHome',
  'NewRecipeByHand',
  'NewRecipeGenerated',
  'NewRecipeByVision',
];
export type NewRecipeStackParamList = Record<
  NewRecipeStackScreenNames[number],
  undefined
>;
export type NewRecipesStackNavigation = NavigationProp<NewRecipeStackParamList>;

const navigationOptions = (mode: Mode) => {
  type NavigationOpts = {
    route: RouteProp<NewRecipeStackParamList, NewRecipeStackScreenNames[number]>;
    navigation: any;
  };
  const { t } = useTranslation();
  return (props: NavigationOpts) => {
    const {
      route,
    }: { route: RouteProp<NewRecipeStackParamList, NewRecipeStackScreenNames[number]> } =
      props;
    return {
      title: t('NewRecipe.Title'),
      headerStyle: {
        backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
      },
      headerTitleStyle: {
        color: COLORS.TEXTCOLOR[mode],
      },
    };
  };
};
const Stack = createStackNavigator<NewRecipeStackParamList>();
const RecipesStackNavigator = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  return (
    <Stack.Navigator
      initialRouteName="NewRecipeHome"
      screenOptions={navigationOptions(mode)}
    >
      <Stack.Screen
        name="NewRecipeHome"
        component={NewRecipeScreen}
      />
      <Stack.Screen
        name="NewRecipeByHand"
        component={NewRecipeByHandScreen}
      />
      <Stack.Screen
        name="NewRecipeGenerated"
        component={NewRecipeGeneratedScreen}
      />
      <Stack.Screen
        name="NewRecipeByVision"
        component={NewRecipeByVisionScreen}
      />
    </Stack.Navigator>
  );
};

export default RecipesStackNavigator;
