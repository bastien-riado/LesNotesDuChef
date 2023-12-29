import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, View } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Recipe } from "../models/RecipeModels";
import { dbRef } from "../services/Auth/config/FirebaseConfig";
import NewRecipeComponent from "./NewRecipeComponent";
import RecipeComponent from "./RecipeComponent";

const RecipesComponent = () => {



    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const userId = auth().currentUser?.uid;

                if (userId) {
                    const snapshot = await dbRef
                        .ref('recipes')
                        .orderByChild('ownerId')
                        .equalTo(userId)
                        .once('value');

                    const data = snapshot.val();

                    if (!!data) {
                        const recipesData: Recipe[] = Object.keys(data).map((recipeId) => ({
                            id: recipeId,
                            ...data[recipeId],
                        }));

                        setRecipes(recipesData);
                    }
                }
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    const getRecipes = async () => {
        toggleModal();
        try {
            setIsLoading(true);
            const userId = auth().currentUser?.uid;

            if (userId) {
                const snapshot = await dbRef
                    .ref('recipes')
                    .orderByChild('ownerId')
                    .equalTo(userId)
                    .once('value');

                const data = snapshot.val();

                if (!!data) {
                    const recipesData: Recipe[] = Object.keys(data).map((recipeId) => ({
                        id: recipeId,
                        ...data[recipeId],
                    }));

                    setRecipes(recipesData);
                }
            }
        } catch (error) {
            console.error('Error fetching data from Firebase:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textContent={'Chargement des recettes...'}
                textStyle={{ color: '#000' }}
            />

            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <RecipeComponent key={item.id} recipe={item} />}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <NewRecipeComponent updateNewRecipes={getRecipes} />
                        <Button title="Fermer" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
    },
    titlePage: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        textAlign: 'left',
    },
    listContainer: {
        paddingHorizontal: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '90%',
        maxWidth: 500,
    },
});


export default RecipesComponent;
