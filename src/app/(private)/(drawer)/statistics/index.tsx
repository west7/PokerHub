import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";
import { Theme } from "../../../../theme/theme";
import useThemedStyles from "../../../../context/ThemeProvider";

export default function Statistics() {
    const styles = useThemedStyles(getStyles);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Statistics</Text>
        </View>
    );
} 

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        flex: 1,
    }, 
    text: {
        color: theme.textColor
    }
});