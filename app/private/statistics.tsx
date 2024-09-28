import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";

export default function Statistics() {
    return (
        <View style={styles.container}>
            <Text style={{color: '#f0f0f0'}}>Statistics</Text>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1,
    }
});