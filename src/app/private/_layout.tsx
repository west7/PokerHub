import React, { useContext, useState } from "react";
import { Redirect, router, Stack } from "expo-router";
import { createDrawerNavigator } from '@react-navigation/drawer'
import Index from './index'
import { FIREBASE_AUTH } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import { colors } from "../interfaces/Colors";
import GameSettings from "./gamesettings";
import Players from "./players";
import History from "./history";
import Statistics from "./statistics";
import { AuthContext } from "../context/AuthProvider";
import LoadingScreen from "../components/LoadingScreen";

const Drawer = createDrawerNavigator();
const auth = FIREBASE_AUTH;

export default function InsideLayout() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("User not found");
    }

    const { signed, user, loading, logout } = context;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            logout();
            router.replace("../public/login")
        }
        catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <LoadingScreen />
    }

    if (!signed || !user) {
        return <Redirect href="" />
    }

    return (
        <Drawer.Navigator screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.backgroundColor,
            },
            headerTintColor: colors.primaryColor,
            headerTitle: "",
            drawerStyle: {
                backgroundColor: "#000",
            },
            drawerActiveBackgroundColor: colors.primaryColor,
            drawerActiveTintColor: colors.textColor,
            drawerInactiveTintColor: colors.textColor,
            drawerInactiveBackgroundColor: colors.backgroundLightColor,
        }}>
            <Drawer.Screen
                name="Home"
                component={Index}
            />
            <Drawer.Screen
                name="Game Settings"
                component={GameSettings}
            />
            <Drawer.Screen
                name="Players"
                component={Players}
            />
            <Drawer.Screen
                name="History"
                component={History}
            />
            <Drawer.Screen
                name="Statistics"
                component={Statistics}
            />
            <Drawer.Screen
                name="Logout"
                component={() => null}
                options={{ drawerLabel: 'Logout' }}
                listeners={{
                    drawerItemPress: () => handleLogout(),
                }}
            />
        </Drawer.Navigator>
    );
}