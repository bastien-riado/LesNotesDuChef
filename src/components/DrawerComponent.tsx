import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Alert } from "react-native";


const DrawerContent = () => {

    const navigation = useNavigation();

    return (
        <DrawerContentScrollView>
            <DrawerItem
            label={() => <Text style={styles.text}>{'<='} Back</Text>}
            onPress={() => 
                navigation.goBack()}
            />
            <DrawerItem
            label={() => <Text style={styles.text}>Home</Text>}
            onPress={() =>
                //@ts-ignore
                navigation.navigate('Home')
            }
            />
            <DrawerItem
            label={() => <Text style={styles.text}>Menu Teste 1</Text>}
            onPress={() => 
                Alert.alert("navigation vers page 1")}
            />
            <DrawerItem
            label={() => <Text style={styles.text}>Menu Teste 2</Text>}
            onPress={() =>
                Alert.alert("navigation vers page 2")
            }
            />
            <DrawerItem
            label={() => <Text style={styles.text}>Créer/éditer une note</Text>}
            onPress={() =>
                //@ts-ignore
                navigation.navigate('Edit')
            }
            />
            <DrawerItem
            label={() => <Text style={styles.text}>A propos</Text>}
            onPress={() => 
                //@ts-ignore
                navigation.navigate('About')
            }
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white"
    }
    })

export default DrawerContent;