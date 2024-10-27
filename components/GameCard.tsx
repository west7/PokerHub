import React from "react";
import SwipeListItem from "./SwipeListItem";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { GameSetup } from "../interfaces/game.interface";
import { Theme } from "../theme/theme";
import useThemedStyles from "../context/ThemeProvider";

interface GameCardProps {
    item: GameSetup;
    onEdit: (item: GameSetup) => void;
    onDelete: (id: string) => void;
    cardStyle?: any;
}

export default function GameCard({ item, onEdit, onDelete, cardStyle }: GameCardProps) {
    const styles = useThemedStyles(getStyles);

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

const getStyles = (theme: Theme) =>  StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundLightColor,
        borderRadius: 10,
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textColor,
        marginBottom: 5,
    },
    text: {
        color: theme.secondaryTextColor,
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'semibold',
    },
    gameCard: {
        backgroundColor: theme.backgroundDarkColor,
        padding: 10,
        borderColor: theme.backgroundLightColor,
        borderWidth: 1,
    },
});