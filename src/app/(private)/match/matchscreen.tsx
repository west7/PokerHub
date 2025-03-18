import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import useThemedStyles from "../../../context/ThemeProvider";
import { Theme } from "../../../theme/theme";
import { useLocalSearchParams } from "expo-router";
import BackButton from "../../../components/BackButton";

export default function MatchScreen() {
    const { gameSetup, playersId } = useLocalSearchParams();
    console.log(gameSetup, playersId);

    const styles = useThemedStyles(getStyles);


    return (
        <SafeAreaView style={styles.container}>
            <BackButton />

            

        </SafeAreaView>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundColor,
    },

})