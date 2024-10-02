import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameSettings from ".";
import CreateGameScreen from "./creategame";
import { RootStackParamList } from "../../../interfaces/type";
import FormProvider from "../../../context/FormProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function GameStack() {
    return (
        <FormProvider>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="GameSettings"
                    component={GameSettings}
                />

                <Stack.Screen
                    name="CreateGame"
                    component={CreateGameScreen}
                    options={{ presentation: 'modal' }}
                />
            </Stack.Navigator>
        </FormProvider>
    );
}