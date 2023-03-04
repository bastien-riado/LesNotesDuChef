import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeContent from "../components/DrawerComponent";
import StackNavigation from "./stack.routes";
import { Button, Alert, TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { IconButton, Stack} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ModalKeyBoard from "../components/ModalKeyBoard";

const Drawer = createDrawerNavigator();

const HomeNavigation = () => {
    return (
        <Drawer.Navigator
        id="DrawerMenu"
        drawerContent={() => <HomeContent />}
        screenOptions={{
            headerShown: true,
            drawerPosition: "left",
            drawerStyle: {
            backgroundColor: "#212529",
            },
        }}
        >
        <Drawer.Screen 
            name="Les Notes Du Chef"
            component={StackNavigation}
            options={{
                headerRight: () => <ModalKeyBoard />
            }}
        />
        </Drawer.Navigator>
    );
};


export default HomeNavigation;