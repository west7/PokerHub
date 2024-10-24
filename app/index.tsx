import 'react-native-gesture-handler';
import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from "../theme/theme";
import { useAuth } from '../context/AuthProvider';
import { router } from 'expo-router';
import LoadingScreen from '../components/LoadingScreen';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <LoadingScreen />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
