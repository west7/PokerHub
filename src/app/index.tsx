import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import LinkButton from "./components/LinkButton";
import { Link, router } from "expo-router";

export default function App() {

  const navigateLogin = () => {
    router.push("public/login");
  }

  const navigateCadastrar = () => {
    router.push("public/cadastro")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poker Tracker</Text>
      <Text style={styles.subtitle}>Manage your own games!</Text>

      {/*  <Image
        source={require("../../assets/logo2.png")}
        style={styles.imagem}
      /> */}

      <LinkButton title="Sign in" onPress={navigateLogin} backgroundColor="#A90800" />

      <LinkButton title="Sign up" onPress={navigateCadastrar} backgroundColor="#A90800" variant="outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#121212",
    alignItems: "center"
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
    color: "#f0f0f0",
    borderBottomWidth: 2,
    borderBottomColor: "#C61414",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 70,
    color: "#f0f0f0",
  },
});
