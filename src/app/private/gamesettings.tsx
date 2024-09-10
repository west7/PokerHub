import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";
import BackButton from "../components/BackButton";

export default function GameSettings() {
    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={{color: '#f0f0f0'}}>GameSettings</Text>
        </View>
    );
} 

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#121212",
        flex: 1,
    }
});