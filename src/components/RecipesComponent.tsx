import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, View } from "react-native";
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

                        console.log('Data from Firebase:', recipesData);
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


    const updateRecipes = async () => {
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

                    console.log('Data from Firebase:', recipesData);
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
            <Text style={styles.titlePage}>Vos recettes</Text>
            <Button title="Ajouter une recette" onPress={toggleModal} />
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
                        <NewRecipeComponent updateRecipes={updateRecipes} />
                        <Button title="Fermer" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    titlePage: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    listContainer: {},
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
    },
});

export default RecipesComponent;
