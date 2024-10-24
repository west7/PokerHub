import React from "react";
import { Stack } from "expo-router";

// Não quero que o Drawer fique visível nessa tela

export default function MatchLayout() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
            />
        </Stack>
    );
}