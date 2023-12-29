import React, { useContext } from "react";
import { Authorization } from "../services/providers/AuthProvider";
import { AuthNavigation } from "./authNavigation/AuthNavigation";
import BottomTabNavigator from "./tabNavigation/TabNavigation";

export const Navigation = () => {

    const authContext = useContext(Authorization);
    if (!authContext) {
        return null;
    }

    const { user, isLoading } = authContext;

    if (isLoading) {
        return null;
    }

    return user ? <BottomTabNavigator /> : <AuthNavigation />;
}