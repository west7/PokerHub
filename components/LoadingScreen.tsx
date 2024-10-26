import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingScreen() {
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.backgroundColor
        }}>
            <ActivityIndicator size="large" color="#C61414" />
        </SafeAreaView>
    );
}
