import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function PublicLayout() {
    return (
        <>
            <StatusBar barStyle="default" />
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen
                    name="login"
                />
                <Stack.Screen
                    name="register"
                />
            </Stack>
        </>
    );
}