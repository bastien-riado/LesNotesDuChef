import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WINDOW_WIDTH } from "../globals/styles/mixins";
import { dbRef } from "../services/Auth/config/FirebaseConfig";

const RecipeComponent = (props: any) => {
    const handleDelete = async () => {
        await dbRef.ref('recipes').child(props.recipe.id).remove();
    };

    return (
        <View style={styles.recipeContainer}>
            <TouchableOpacity onPress={handleDelete} style={styles.recipeContainer}>
                <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.recipeText}>{props.recipe.id}</Text>
            <Text style={styles.recipeText}>{props.recipe.name}</Text>
            <Text style={styles.recipeText}>{props.recipe.description}</Text>
            <Text style={styles.recipeText}>{props.recipe.time}</Text>
            <Text style={styles.recipeText}>{props.recipe.difficulty}</Text>
            <Text>{WINDOW_WIDTH}</Text>
        </View>
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
