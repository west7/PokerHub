import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../theme/theme";

export default function BackButton() {

    const goBack = () => {
        if (router.canGoBack()) {
            router.back();
        }
    }

    return (
        <Pressable
            onPress={goBack}
            style={styles.container}>
            <Icon name="chevron-left" size={30} color={colors.textColor} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        justifyContent: "center",
        marginTop: 10,
        opacity: 0.7,
    }
})