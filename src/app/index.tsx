import 'react-native-gesture-handler';
import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from "./interfaces/Colors";
import Login from "./public/login"
import { AuthContext } from './context/AuthProvider';
import { router } from 'expo-router';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const { user, loading } = useContext(AuthContext) ?? (() => { throw new Error("AuthContext not provided") })();

  useEffect(() => {
    //console.log('App', user, loading)
    if (!loading && user) {
      router.replace("private/");
    }
  }, [user, loading]);

  if (loading || (user && !loading)) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <Login />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
