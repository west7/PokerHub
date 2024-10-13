import React, { useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { GameSetup } from "../interfaces/game.interface";
import { colors } from "../theme/theme";
import SwipeListItem from "./SwipeListItem";
import { Player } from "../interfaces/player.interface";


function isGameSetup(item: GameSetup | Player): item is GameSetup {
    return (item as GameSetup).gameName !== undefined;
}

function isPlayer(item: GameSetup | Player): item is Player {
    return (item as Player).name !== undefined;
}
interface ListProps<T> {
    data: T[];
    loading: boolean;
    onEditGame: (game: GameSetup) => void;
    onDeleteGame: (gameName: string) => void;
    onEditPlayer: (player: Player) => void;
    onDeletePlayer: (playerID: string) => void;
}

export default function List<T extends GameSetup | Player>({ 
    data, 
    loading, 
    onEditGame,
    onDeleteGame,
    onEditPlayer,
    onDeletePlayer,
}: ListProps<T>) {

    const gameCard = ({ item }: { item: GameSetup }) => {
        return (
                <SwipeListItem onEdit={() => onEditGame(item)} onDelete={() => onDeleteGame(item.gameName)}>
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
                </SwipeListItem>
        );
    }

    const playerCard = ({ item }: { item: Player }) => {
        return (
             <SwipeListItem onEdit={() => onEditPlayer(item)} onDelete={() => onDeletePlayer(item.uid)}>
                <Pressable style={styles.playerCard} onPress={() => console.log('Player:', item.name)}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.text}>Balance: {item.totalBalance}</Text>
                        <Text style={styles.text}>Games Played: {item.gamesPlayed}</Text>
                    </View>
                    <Text style={styles.text}>Games Won: {item.gamesWon}</Text>
                </Pressable>
            </SwipeListItem>
        );
    }

    const renderItem = ({ item }: { item: GameSetup | Player }) => {
        if (isGameSetup(item)) {
            return gameCard({ item });
        } else if (isPlayer(item)) {
            return playerCard({ item });
        }
        return null;
    };

    if (loading) {
        return <ActivityIndicator size="small" color={colors.primaryColor} />;
    }

    return (
        <FlatList
            style={styles.container}
            data={data}
            keyExtractor={(item) => (isGameSetup(item) ? item.gameName : item.name)}
            renderItem={renderItem}
            ListEmptyComponent={
                <Text style={styles.title}>No items found</Text>
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
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    playerCard:{
        backgroundColor: colors.backgroundColor,
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});