import React from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeProvider";

export default function LoadingScreen() {
    const {theme} = useTheme();

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.backgroundColor
        }}>
            <ActivityIndicator size={Platform.OS === 'ios' ? "small" : "large"} color={theme.primaryColor} />
        </SafeAreaView>
    );
}
