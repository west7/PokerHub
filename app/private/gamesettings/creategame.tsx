import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../interfaces/Colors";
import BackButton from "../../../components/BackButton";

export default function CreateGameScreen() {
    return (
        <View style={styles.container}>
            <BackButton /> {/* just for web development */}
            <Text style={styles.text}>Insert Information</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    text: {
        fontSize: 20,
        color: colors.textColor,
        fontWeight: "bold",
        padding: 16,
    }
})