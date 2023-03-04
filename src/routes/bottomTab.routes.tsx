import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomePage from "../screens/HomePage";
import AboutPage from "../screens/AboutPage";
import EditingPage from "../screens/EditingPage";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#00a5e0",
            tabBarInactiveTintColor: "#0466c8",
            tabBarStyle: {
            backgroundColor: "#000814",
            borderTopWidth: 0,
            
            },
            tabBarHideOnKeyboard: true,
            tabBarLabelStyle: {
            fontSize: 15,
            },
            }}
        >
            <Tab.Screen
            name="Home"
            component={HomePage}
            options={{
            tabBarIcon: ({ color }) => (
                <Feather name="home" size={24} color={color} />
            ),
            }}
            />
            <Tab.Screen
            name="Edit"
            component={EditingPage}
            options={{
            tabBarIcon: ({ color }) => (
                <Feather name="settings" size={24} color={color} />
            ),
            }}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;