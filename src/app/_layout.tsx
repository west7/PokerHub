import React, { useContext, useEffect } from "react";
import { router, Stack, useSegments } from "expo-router";
import AuthProvider, { AuthContext } from "./context/AuthProvider";
import InsideLayout from "./private/_layout";
import LoadingScreen from "./components/LoadingScreen";

export default function RootLayout() {

    return (
        <AuthProvider>
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="public/login" />
            </Stack>
        </AuthProvider>
    );
}