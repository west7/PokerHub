import React, { useContext, useEffect } from "react";
import { router, Stack, useSegments } from "expo-router";
import AuthProvider, { AuthContext } from "./context/AuthProvider";
import InsideLayout from "./private/_layout";
import LoadingScreen from "./components/LoadingScreen";
import { colors } from "./interfaces/Colors";

export default function RootLayout() {

    return (
        <AuthProvider>
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="public/login" />
                <Stack.Screen name="public/register" options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: colors.backgroundColor,
                    },
                    title: "Register",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        color: colors.textColor,
                        fontSize: 30,
                    },
                    headerTintColor: colors.textColor
                }} />
            </Stack>
        </AuthProvider>
    );
}