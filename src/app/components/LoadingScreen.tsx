import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../interfaces/Colors";

export default function LoadingScreen() {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.backgroundColor
        }}>
            <ActivityIndicator size="large" color="#C61414" />
        </View>
    );
}
