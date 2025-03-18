import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

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
                <Stack.Screen
                    name="matchscreen"
                />
            </Stack>
        </>
    );
}