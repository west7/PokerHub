import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinkButton from "../components/LinkButton";
import { colors } from "../interfaces/Colors";
import { router } from "expo-router";

export default function Home() {
    
    const navigateLogin = () => {
        router.push("public/login");
    }

    const navigateCadastrar = () => {
        router.push("public/cadastro")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Poker App</Text>

            <Text style={styles.subtitle}>Manage your own games!</Text>

            <LinkButton title="Sign in" onPress={navigateLogin} backgroundColor={colors.primaryDarkColor} />

            <LinkButton title="Sign up" onPress={navigateCadastrar} backgroundColor={colors.primaryDarkColor} variant="outline" />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        alignSelf: "center",
        marginTop: 200,
        marginBottom: 10,
        color: colors.textColor,
        textDecorationLine: "underline",
        textDecorationColor: colors.primaryDarkColor,
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center",
        marginBottom: 70,
        color: colors.textColor,
    },
})