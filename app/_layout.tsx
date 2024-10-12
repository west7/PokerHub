import React from "react";
import { Stack } from "expo-router";
import AuthProvider from "../context/AuthProvider";
import { StatusBar } from "react-native";
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { colors } from "../theme/theme";

export default function RootLayout() {

    const toastConfig = {
        success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'green', backgroundColor: colors.backgroundLightColor }}
                text1Style={{
                    fontSize: 16,
                    color: colors.textColor
                }}
                text2Style={{
                    fontSize: 14
                }}
            />
        ),
        error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
            <ErrorToast
                {...props}
                style={{ borderLeftColor: 'red', backgroundColor: colors.backgroundLightColor }}
                text1Style={{
                    fontSize: 16,
                    color: colors.textColor
                }}
                text2Style={{
                    fontSize: 14
                }}
            />
        )
    }


    return (
        <AuthProvider>
            <StatusBar barStyle="default" />
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen
                    name="public/login"
                />
                <Stack.Screen
                    name="public/register"
                />
            </Stack>
            <Toast config={toastConfig} />
        </AuthProvider>
    );
}