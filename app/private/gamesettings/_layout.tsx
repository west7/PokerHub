import { router, Stack } from "expo-router";
import React from "react";
import { Button } from "react-native";

export default function GameStack() {
    return (
        <Stack screenOptions={{
            headerShown: true
        }}>
            <Stack.Screen
                name="index"
                options={{
                    title: "Game Settings",
                }}
            />

            <Stack.Screen
                name="creategame"
                options={{
                    presentation: "modal",
                    title: "Create Game",
                }}
            />
        </Stack>
    );
}