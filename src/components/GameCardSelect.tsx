import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { GameSetup } from "../interfaces/game.interface";
import { Theme } from "../theme/theme";
import useThemedStyles, { useTheme } from "../context/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface GameCardSelectProps {
    item: GameSetup;
    cardStyle?: any;
    onClick: (item: GameSetup) => void;
    isSelected: boolean;
}

export default function GameCardSelect({ item, cardStyle, onClick, isSelected }: GameCardSelectProps) {
    const styles = useThemedStyles(getStyles);
    const { theme } = useTheme();

    return (
        <View style={[cardStyle]}>
            <Pressable
                style={[styles.gameCard, cardStyle, isSelected && { borderColor: theme.textColor, borderWidth: 2 }]}
                onPress={() => onClick(item)}
            >
                {isSelected &&
                    <View style={styles.checkboxContainer}>
                        <Icon
                            name={isSelected ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                            size={24}
                            color={isSelected ? theme.textColor : "grey"}
                        />
                    </View>
                }

                <Text style={styles.title}>{item.gameName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>Time for level: {item.timeForLevel} min</Text>
                    <Text style={[styles.text, { marginLeft: 5 }]}>Levels: {item.blindLevels.length}</Text>
                </View>
                <Text style={styles.text}>Initial Blinds: {item.blindLevels[0].smallBlind} | {item.blindLevels[0].bigBlind}</Text>

            </Pressable>
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
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
    checkboxContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
});