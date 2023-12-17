import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WINDOW_WIDTH } from "../globals/styles/mixins";
import { Recipe } from "../models/RecipeModels";
import { dbRef } from "../services/Auth/config/FirebaseConfig";

interface RecipeComponentProps {
    recipe: Recipe;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipe }) => {

    const navigation = useNavigation();

    const handleDelete = async () => {
        await dbRef.ref('recipes').child(recipe.id).remove();
    };

    const handlePress = () => {
        navigation.navigate('RecipeDetailsScreen', { recipe });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.recipeContainer}>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.recipeText}>{recipe.name}</Text>
                <Text style={styles.recipeText}>Time: {recipe.time}</Text>
                <Text style={styles.recipeText}>Difficulty: {recipe.difficulty}</Text>
                <Text>{WINDOW_WIDTH}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    recipeContainer: {
        backgroundColor: "#EFEFEF",
        padding: 10,
        margin: 10,
        borderRadius: 8,
        elevation: 10,
        width: WINDOW_WIDTH / 2 - 40,
    },
    recipeText: {
        fontSize: 16,
        marginBottom: 8,
        color: 'black',
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 50,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RecipeComponent;
