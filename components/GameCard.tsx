import React from "react";
import SwipeListItem from "./SwipeListItem";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { GameSetup } from "../interfaces/game.interface";
import { colors } from "../theme/theme";

interface GameCardProps {
    item: GameSetup;
    onEdit: (item: GameSetup) => void;
    onDelete: (id: string) => void;
    cardStyle?: any;
}

export default function GameCard({ item, onEdit, onDelete, cardStyle }: GameCardProps
) {
    return (
        <SwipeListItem
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.gameName)}
            containerStyle={cardStyle}
        >
            <Pressable
                style={[styles.gameCard, cardStyle]}
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
        color: "grey",
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'semibold',
    },
    gameCard: {
        backgroundColor: colors.backgroundDarkColor,
        padding: 10,
        borderColor: colors.backgroundLightColor,
        borderWidth: 1,
        
    },
})