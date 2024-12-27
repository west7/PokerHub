import React from "react";
import { Player } from "../interfaces/player.interface";
import { GameSetup } from "../interfaces/game.interface";
import { ActivityIndicator, FlatList, StyleSheet, ViewStyle } from "react-native";
import GameCardSelect from "./GameCardSelect";
import PlayerCardSelect from "./PlayerCardSelect";
import useThemedStyles, { useTheme } from "../context/ThemeProvider";
import { Theme } from "../theme/theme";

function isGameSetup(item: GameSetup | Player): item is GameSetup {
    return (item as GameSetup).gameName !== undefined;
}

function isPlayer(item: GameSetup | Player): item is Player {
    return (item as Player).playerId !== undefined;
}

interface SelectListProps<T extends GameSetup | Player> {
    data: T[];
    loading: boolean;
    horizontal?: boolean;
    containerStyle?: ViewStyle;
    onClick: (item: T) => void;
    selectedGameName?: string | null;
    selectedPlayersId: string[];
    scrollEnabled?: boolean;
}

export default function SelectList<T extends GameSetup | Player>({
    data,
    loading,
    horizontal,
    containerStyle,
    onClick,
    selectedGameName,
    selectedPlayersId,
    scrollEnabled,
}: SelectListProps<T>) {
    const { theme } = useTheme();
    const styles = useThemedStyles(getStyles)

    const renderItem = ({ item, index }: { item: T, index: number }) => {
        const isFirstItem = index === 0;
        const isLastItem = index === data.length - 1;

        if (isGameSetup(item)) {
            return (
                <GameCardSelect
                    item={item}
                    onClick={() => onClick(item)}
                    isSelected={item.gameName === selectedGameName}
                    cardStyle={[
                        isFirstItem && { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
                        isLastItem && { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
                    ]}
                />
            );
        } else if (isPlayer(item)) {
            return (
                <PlayerCardSelect
                    item={item}
                    onClick={() => onClick(item)}
                    isSelected={selectedPlayersId.includes(item.playerId)}
                    cardStyle={[
                        isFirstItem && { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                        isLastItem && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
                    ]}
                />
            );
        }

        return null;
    }

    if (loading) {
        return <ActivityIndicator size="small" color={theme.primaryColor} />;
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => (isGameSetup(item) ? item.gameName : item.playerId)}
            renderItem={renderItem}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={[containerStyle, styles.container]}
            scrollEnabled={scrollEnabled}
        />
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.textColor,
        marginBottom: 5,
    },
    text: {
        color: theme.textColor,
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'semibold',
    },
    emptyText: {
        color: theme.textColor,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});