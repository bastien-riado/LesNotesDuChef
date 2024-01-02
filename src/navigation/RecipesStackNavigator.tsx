import { createStackNavigator } from "@react-navigation/stack"
import RecipesScreen from "../screens/RecipesScreen";
import { NavigationProp } from "@react-navigation/native";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import { COLORS } from "../globals/styles";
import { Mode } from "../models/themeStateModels";
import { useSelector } from "react-redux";

export type RecipeStackScreenNames = ["Recipes", "RecipeDetails"]
export type RecipeStackParamList = Record<RecipeStackScreenNames[number], any>;
export type RecipesStackNavigation = NavigationProp<RecipeStackParamList>;
const Stack = createStackNavigator<RecipeStackParamList>();

const navigationOptions = (mode: Mode) => ({
    headerStyle: {
        backgroundColor: COLORS.BG_SECONDARYCOLOR[mode]
    },
});

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