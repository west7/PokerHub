import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../theme/theme";
import BackButton from "../../../components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Match() {
    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <Text style={styles.title}>Select the Game Setup</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.textColor,
        padding: 16,
    }
});