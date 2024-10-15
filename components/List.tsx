import React, { useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { GameSetup } from "../interfaces/game.interface";
import { colors } from "../theme/theme";
import { Player } from "../interfaces/player.interface";
import GameCard from "./GameCard";
import PlayerCard from "./PlayerCard";


function isGameSetup(item: GameSetup | Player): item is GameSetup {
    return (item as GameSetup).gameName !== undefined;
}

function isPlayer(item: GameSetup | Player): item is Player {
    return (item as Player).name !== undefined;
}
interface ListProps<T extends GameSetup | Player> {
    data: T[];
    loading: boolean;
    onEdit: (item: T) => void;
    onDelete: (id: string) => void;
}

export default function List<T extends GameSetup | Player>({
    data,
    loading,
    onEdit,
    onDelete,
}: ListProps<T>) {

    const renderItem = ({ item }: { item: T }) => {
        if (isGameSetup(item)) {
            return <GameCard item={item} onEdit={() => onEdit(item)} onDelete={onDelete} />;
        } else if (isPlayer(item)) {
            return <PlayerCard item={item} onEdit={() => onEdit(item)} onDelete={onDelete} />;
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
            keyExtractor={(item) => (isGameSetup(item) ? item.gameName : item.playerId)}
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
});