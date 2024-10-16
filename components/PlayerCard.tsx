import React from "react";
import SwipeListItem from "./SwipeListItem";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors } from "../theme/theme";
import { Player } from "../interfaces/player.interface";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface PlayerCardProps {
    item: Player;
    onEdit: (item: Player) => void;
    onDelete: (id: string) => void;
}

export default function PlayerCard({ item, onEdit, onDelete }: PlayerCardProps
) {
    return (
        <SwipeListItem onEdit={() => onEdit(item)} onDelete={() => onDelete(item.playerId)}>
            <Pressable style={styles.playerCard} onPress={() => console.log('Player:', item.name, item.playerId)}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '22%'}}>
                        {
                            item.totalBalance > 0 ?
                                <Icon name="chevron-up" size={24} color={'#19ff19'} />
                                :
                                (
                                    item.totalBalance < 0 ?
                                        <Icon name="chevron-down" size={24} color={'red'} />
                                        :
                                        <Icon name="minus" size={24} color={'white'} />
                                )
                        }
                        <Text style={styles.text}> {item.totalBalance} </Text>

                    </View>
                </View>

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
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textColor,
        marginBottom: 5,
        margin: 5,
    },
    text: {
        color: colors.textColor,
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 6,
    },
    playerCard: {
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
})