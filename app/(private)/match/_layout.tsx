import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

// Não quero que o Drawer fique visível nessa tela

export default function MatchLayout() {

    return (
        <>
            <StatusBar barStyle="default" />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="index"
                />
            </Stack>
        </>
    );
}