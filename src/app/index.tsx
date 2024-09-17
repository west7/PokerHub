import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import LinkButton from "./components/LinkButton";
import { Stack, Link, router } from "expo-router";
import { colors } from "./interfaces/Colors";
import type { StatusBarStyle } from 'react-native';


export default function App() {
  

  const navigateLogin = () => {
    router.push("public/login");
  }

  const navigateCadastrar = () => {
    router.push("public/cadastro")
  }

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        hidden
      />
        <Text style={styles.title}>Poker App</Text>

      <Text style={styles.subtitle}>Manage your own games!</Text>

      <LinkButton title="Sign in" onPress={navigateLogin} backgroundColor={colors.primaryDarkColor} />

      <LinkButton title="Sign up" onPress={navigateCadastrar} backgroundColor={colors.primaryDarkColor} variant="outline" />

    </SafeAreaView >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
  },
  imagem: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginBottom: 60,
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
});
