import React, { useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Pressable, StyleSheet, ViewStyle } from "react-native";
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
    containerStyle?: ViewStyle;
}

export default function List<T extends GameSetup | Player>({
    data,
    loading,
    onEdit,
    onDelete,
    containerStyle,
}: ListProps<T>) {

    const renderItem = ({ item, index }: { item: T, index: number }) => {
        const isFirstItem = index === 0;
        const isLastItem = index === data.length - 1;

        if (isGameSetup(item)) {
            return (
                <GameCard
                    item={item}
                    onEdit={() => onEdit(item)}
                    onDelete={onDelete}
                    cardStyle={[
                        isFirstItem && { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                        isLastItem && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
                    ]}
                />
            );
        } else if (isPlayer(item)) {
            return (
                <PlayerCard
                    item={item}
                    onEdit={() => onEdit(item)}
                    onDelete={onDelete}
                    cardStyle={[
                        isFirstItem && { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                        isLastItem && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
                    ]}
                />
            );
        }
        return null;
    };

    if (loading) {
        return <ActivityIndicator size="small" color={colors.primaryColor} />;
    }

    return (
        <FlatList
            style={[styles.container, containerStyle]}
            data={data}
            keyExtractor={(item) => (isGameSetup(item) ? item.gameName : item.playerId)}
            renderItem={renderItem}
            ListEmptyComponent={ <Text style={styles.emptyText}>No items found</Text> }
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
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
    emptyText: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});