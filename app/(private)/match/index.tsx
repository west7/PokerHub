import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../../../components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "../../../theme/theme";
import useThemedStyles from "../../../context/ThemeProvider";


export default function Match() {
    const styles = useThemedStyles(getStyles);  

    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <Text style={styles.title}>Select the Game Setup</Text>
        </SafeAreaView>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundColor,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.textColor,
        padding: 16,
    }
});