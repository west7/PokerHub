import React, { useEffect, useState } from "react";
import { router, Slot, Stack } from "expo-router";
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
                style={{ borderLeftColor: '#19ff19', backgroundColor: colors.backgroundLightColor }}
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
                style={{ borderLeftColor: '#FA2D1E', backgroundColor: colors.backgroundLightColor }}
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
            <Slot />
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