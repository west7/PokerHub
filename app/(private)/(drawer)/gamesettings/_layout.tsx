import React from "react";
import { Stack } from "expo-router";
import FormProvider from "../../../../context/FormProvider";


export default function GameStack() {
    return (
        <FormProvider>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="index"
                />

                <Stack.Screen
                    name="creategame"
                    options={{ presentation: 'modal' }}
                />
            </Stack>
        </FormProvider>
    );
}