import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";
import BackButton from "../components/BackButton";
import { AuthContext } from "../context/AuthProvider";

export default function GameSettings() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("User not found");
    }

    const { user, loading } = context;

    return (
        <View style={styles.container}>
            <Text style={{ color: '#f0f0f0' }}>GameSettings</Text>
            <Text style={{color: '#fff'}}>Hi, {user?.name} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1,
    }
});