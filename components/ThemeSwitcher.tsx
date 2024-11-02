import React from "react";
import { useTheme } from "../context/ThemeProvider";
import { View, Text, StyleSheet, Switch } from "react-native";
import { darkTheme } from "../theme/theme";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === darkTheme;

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: theme.backgroundLightColor, true: theme.backgroundLightColor }}
                thumbColor={isDarkMode ? theme.primaryColor : theme.backgroundLightColor}
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