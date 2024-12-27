import React, { useEffect, useState } from "react";
import { router, Slot } from "expo-router";
import AuthProvider, { useAuth } from "../context/AuthProvider";
import { StatusBar } from "react-native";
import Toast from 'react-native-toast-message';
import LoadingScreen from "../components/LoadingScreen";
import { ThemeProvider } from "../context/ThemeProvider";
import toastConfig from "../utils/toastConfig";

export default function RootLayout() {

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
            <ThemeProvider>
                <StatusBar barStyle="default" />
                <Layout />
                <Toast config={toastConfig} />
            </ThemeProvider>
        </AuthProvider>
    );
}