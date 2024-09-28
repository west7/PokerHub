import React from "react";
import { router, Stack } from "expo-router";
import AuthProvider from "../context/AuthProvider";
import { colors } from "../interfaces/Colors";

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