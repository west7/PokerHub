import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { View, Text, StyleSheet, Switch } from "react-native";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme.baseColor === "#000";

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: theme.backgroundLightColor, true: theme.backgroundDarkColor }}
                thumbColor={isDarkMode ? theme.primaryColor : "white"}
                ios_backgroundColor={theme.backgroundLightColor}
                onValueChange={toggleTheme}
                value={isDarkMode}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        margin: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
    },
});