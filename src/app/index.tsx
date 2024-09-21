import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from "./interfaces/Colors";
import Home from "./public/home";
import AuthProvider from "./context/AuthProvider";


export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <StatusBar barStyle="default" />
        <Home />
      </AuthProvider>
    </SafeAreaView >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
