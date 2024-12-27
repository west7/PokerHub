import React from "react";
import SwipeListItem from "./SwipeListItem";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Player } from "../interfaces/player.interface";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Theme } from "../theme/theme";
import useThemedStyles, { useTheme } from "../context/ThemeProvider";

interface PlayerCardProps {
    item: Player;
    onEdit: (item: Player) => void;
    onDelete: (id: string) => void;
    cardStyle?: any;
}

export default function PlayerCard({ item, onEdit, onDelete, cardStyle }: PlayerCardProps) {
    
    const formatBalance = (balance: number) => {
        const balanceStr = Math.abs(balance).toString();
        return balanceStr.length > 6 ? `${balanceStr.slice(0, 5)}...` : balanceStr;
    };

    const styles = useThemedStyles(getStyles);
    const { theme } = useTheme();

    return (
        <SwipeListItem
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.playerId)}
            containerStyle={cardStyle}
        >
            <Pressable style={[styles.playerCard, cardStyle]} onPress={() => console.log('Player:', item.name, item.playerId)} onLongPress={() => { }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '30%' }}>

                        {item.totalBalance > 0 ? (
                            <Icon name="chevron-up" size={24} color={theme.successColor} />
                        ) : item.totalBalance < 0 ? (
                                <Icon name="chevron-down" size={24} color={theme.primaryColor} />
                        ) : (
                            <Icon name="minus" size={24} color={theme.textColor} />
                        )}
                        <Text style={styles.text}> {formatBalance(item.totalBalance)} </Text>

                    </View>
                </View>

            </Pressable>
        </SwipeListItem>
    );
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