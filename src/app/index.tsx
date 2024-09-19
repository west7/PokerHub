import React from "react";
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { colors } from "./interfaces/Colors";
import Home from "./public/home";

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" /> 
      <Home />
    </SafeAreaView >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
