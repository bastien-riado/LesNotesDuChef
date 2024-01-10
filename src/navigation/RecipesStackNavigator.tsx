import { createStackNavigator } from "@react-navigation/stack"
import RecipesScreen from "../screens/RecipesScreen";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import { COLORS } from "../globals/styles";
import { Mode } from "../models/themeStateModels";
import { useSelector } from "react-redux";
import { Recipe } from "../models/RecipeModels";

export type RecipeStackScreenNames = ["Recipes", "RecipeDetails"]
export type RecipeStackParamList = Record<RecipeStackScreenNames[number], { recipe: Recipe } | undefined>;
export type RecipesStackNavigation = NavigationProp<RecipeStackParamList>;
const Stack = createStackNavigator<RecipeStackParamList>();

const navigationOptions = (mode: Mode) => {
    type NavigationOpts = {
        route: RouteProp<RecipeStackParamList, RecipeStackScreenNames[number]>;
        navigation: any;
    };
    return (props: NavigationOpts) => {
        const { route }: { route: RouteProp<RecipeStackParamList, RecipeStackScreenNames[number]> } = props;
        return {
            title: route.name === "Recipes" ? "Liste des recettes" : route.params?.recipe.title,
            headerStyle: {
                backgroundColor: COLORS.BG_SECONDARYCOLOR[mode],
            },
            headerTitleStyle: {
                color: COLORS.TEXTCOLOR[mode]
            },
        }
    }
};

const RecipesStackNavigator = () => {
    const mode: Mode = useSelector((state: any) => state.theme.mode);
    return <Stack.Navigator
        screenOptions={navigationOptions(mode)}
        initialRouteName="Recipes"
    >
        <Stack.Screen
            name="Recipes"
            component={RecipesScreen} />
        <Stack.Screen
            name="RecipeDetails"
            component={RecipeDetailsScreen} />
    </Stack.Navigator>
}

export default RecipesStackNavigator;