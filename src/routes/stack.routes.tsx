import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import HomePage from "../screens/HomePage";
import BottomTab from "./bottomTab.routes";
import AboutPage from "../screens/AboutPage";
import EditingPage from "../screens/EditingPage";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
    
        <Stack.Navigator initialRouteName="Home">
            <Stack.Group 
                screenOptions={{ headerShown: false}}>
            <Stack.Screen
                name="Root"
                component={BottomTab}
                /*options={{
                header: () => <CustomHeader />,
                }}*/
            />
            </Stack.Group>

            <Stack.Group
                screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="About" component={AboutPage} />
            <Stack.Screen name="Edit" component={EditingPage} />
            </Stack.Group>
        </Stack.Navigator>
    
    );
};

export default StackNavigation;