import React, { useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { GameSetup } from "../interfaces/game.interface";
import { colors } from "../interfaces/Colors";

interface GamesListProps {
    gamesList: GameSetup[];
    loading: boolean;
}

export default function GamesList({ gamesList, loading }: GamesListProps) {

    const gameCard = ({ item }: { item: GameSetup }) => {
        return (
            <Pressable
                style={styles.gameCard}
                onPress={() => console.log('Jogo:', item.gameName)}
            >
                <Text style={styles.title}>{item.gameName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>Time for level: {item.timeForLevel} min</Text>
                    <Text style={styles.text}>Levels: {item.blindLevels.length}</Text>
                </View>
                <Text style={styles.text}>Initial Blinds: {item.blindLevels[0].smallBlind} | {item.blindLevels[0].bigBlind}</Text>
            </Pressable>
        );
    }

    if (loading) {
        return <ActivityIndicator size="small" color={colors.primaryColor} />;
    }

    return (
        <FlatList
            style={styles.container}
            data={gamesList}
            keyExtractor={(item) => item.gameName}
            renderItem={gameCard}
            ListEmptyComponent={
                <Text style={styles.title}>No games found</Text>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundLightColor,
        borderRadius: 10,
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textColor,
        marginBottom: 5,
    },
    text: {
        color: colors.textColor,
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'semibold',
    },
    gameCard: {
        backgroundColor: colors.backgroundColor,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    }
});