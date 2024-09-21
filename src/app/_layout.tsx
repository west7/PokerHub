import React from "react";
import { Stack } from "expo-router";
import AuthProvider from "./context/AuthProvider";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{
                headerShown: false
            }} >
            </Stack>
        </AuthProvider>
    );
}