import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import AuthProvider, { useAuth } from "../context/AuthProvider";
import { StatusBar } from "react-native";
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { colors } from "../theme/theme";
import LoadingScreen from "../components/LoadingScreen";

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

    const Layout = () => {
        const { isSignedIn, initialLoading } = useAuth();
        const [initialCheckCompleted, setInitialCheckCompleted] = useState(false);

        useEffect(() => {
            if (!initialLoading) {
                if (isSignedIn) {
                    router.replace("/(private)/(drawer)/");
                } else {
                    router.replace("/(public)/login");
                }
                setInitialCheckCompleted(true);
            }
        }, [isSignedIn, initialLoading]);

        if (initialLoading && !initialCheckCompleted) {
            return <LoadingScreen />;
        }

        return (
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen
                    name="(public)/login"
                />
                <Stack.Screen
                    name="(public)/register"
                />
            </Stack>
        );
    }

    return (
        <AuthProvider>
            <StatusBar barStyle="default" />
            <Layout />
            <Toast config={toastConfig} />
        </AuthProvider>
    );
}