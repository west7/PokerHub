import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Match from ".";

const Stack = createStackNavigator();

export default function MatchLayout() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Match"
                component={Match}
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    );
}