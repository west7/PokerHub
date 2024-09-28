import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";
import { AuthContext } from "../../../context/AuthProvider";
import { colors } from "../../../interfaces/Colors";
import LinkButton from "../../../components/LinkButton";
import { NavProps } from "../../../interfaces/type";
import { useNavigation } from '@react-navigation/native';

export default function GameSettings() {
    const context = useContext(AuthContext);
    const navigation = useNavigation<NavProps>();

    if (!context) {
        throw new Error("User not found");
    }

    const { user, loading } = context;

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.text}>My games</Text>
                <LinkButton
                    title="New Game"
                    onPress={() => navigation.navigate("CreateGame")}
                    variant="primary"
                    size="small"
                    iconName="plus"
                    textStyles={{ fontWeight: "bold" }}
                />
            </View>

            <Text style={styles.text}>Games List</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        flex: 1,
        padding: 16,
    },
    title: {
        color: colors.textColor,
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: colors.textColor,
        fontWeight: "bold",
        padding: 16,
    }
});