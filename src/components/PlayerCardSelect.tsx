import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Player } from "../interfaces/player.interface";
import { Theme } from "../theme/theme";
import useThemedStyles, { useTheme } from "../context/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface PlayerCardSelectProps {
    item: Player;
    cardStyle?: any;
    onClick: (item: Player) => void;
    isSelected: boolean;
}

export default function PlayerCardSelect({ item, cardStyle, onClick, isSelected }: PlayerCardSelectProps) {
    const { theme } = useTheme();
    const styles = useThemedStyles(getStyles);

    return (
        <View style={[cardStyle]}>
            <Pressable
                style={[styles.playerCard, cardStyle]}
                onPress={() => onClick(item)}
            >
                < View style={styles.checkboxContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Icon
                        name={isSelected ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"} // Ícone de checkbox
                        size={24}
                        color={isSelected ? theme.textColor : "grey"}
                    />
                </View>

            </Pressable>
        </View>
    )
} 

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textColor,
        marginBottom: 5,
        margin: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
    },
    text: {
        color: theme.secondaryTextColor,
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'semibold',
        alignSelf: 'center',
        paddingTop: 6,
    },
    playerCard: {
        backgroundColor: theme.backgroundDarkColor,
        padding: 10,
        borderColor: theme.backgroundLightColor,
        borderWidth: 1,
    },
})