import { createStackNavigator } from "@react-navigation/stack"
import RecipesScreen from "../screens/RecipesScreen";
import { NavigationProp } from "@react-navigation/native";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

export type RecipeStackScreenNames = ["Recipes", "RecipeDetails"]
export type RecipeStackParamList = Record<RecipeStackScreenNames[number], any>;
export type RecipesStackNavigation = NavigationProp<RecipeStackParamList>;
const Stack = createStackNavigator<RecipeStackParamList>();

const RecipesStackNavigator = () => (
    <Stack.Navigator
        initialRouteName="Recipes"
    >
        <Stack.Screen
            name="Recipes"
            component={RecipesScreen} />
        <Stack.Screen
            name="RecipeDetails"
            component={RecipeDetailsScreen} />
    </Stack.Navigator>
)

export default RecipesStackNavigator;