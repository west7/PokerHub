import React from "react";
import { Stack } from "expo-router";
import AuthProvider from "../context/AuthProvider";
import { StatusBar } from "react-native";

export default function RootLayout() {

    return (
        <AuthProvider>
            <StatusBar barStyle="default" />
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen
                    name="public/login"
                />
                <Stack.Screen
                    name="public/register"
                />
            </Stack>
        </AuthProvider>
    );
}