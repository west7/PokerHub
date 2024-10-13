import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { colors } from "../../../theme/theme";
import LinkButton from "../../../components/LinkButton";
import { AuthContext } from "../../../context/AuthProvider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NavProps } from "../../../interfaces/type";
import Modal from "../../../components/Modal";
import { Player } from "../../../interfaces/player.interface";
import { createPlayer, getUserPlayers } from "../../../services/players.services";
import PlayerList from "../../../components/List";

const inititalPlayer: Player = {
    uid: '',
    name: '',
    totalBalance: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    lastTransaction: null,
}

export default function Players() {
    const context = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerName, setPlayerName] = useState('');
    const [playerData, setPlayerData] = useState(inititalPlayer);

    if (!context) {
        throw new Error("User not found");
    }
    const { user } = context;

    const handleNewPlayer = () => {
        if (Platform.OS === 'ios') {
            Alert.prompt("Player name", "Enter the player's name", (player) => {
                if (player) {
                    handleCreatePlayer({
                        ...playerData,
                        name: player,
                    });
                }
            });
        } else {
            setModalVisible(true);
        }
    }

    const handleCreatePlayer = (playerData: Player) => {
        if (!playerData) {
            return;
        }

        setLoading(true);
        if (user) {
            createPlayer(user.uid, playerData)
                .then(() => {
                    console.log('Player created');
                    loadPlayers(user.uid);
                })
                .catch((err) => {
                    console.error('Error creating player', err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }


    const handleConfirm = () => {
        handleCreatePlayer({ ...playerData, name: playerName });
        setModalVisible(false);
    }

    const loadPlayers = (userId: string) => {
        setLoading(true);
        getUserPlayers(userId)
            .then((players) => {
                setPlayers(players);
            })
            .catch((err) => {
                console.error('Error fetching players', err);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    useFocusEffect(
        React.useCallback(() => {
            if (user) {
                loadPlayers(user.uid);
            }
        }, [user])
    );

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.text}>Players</Text>
                <LinkButton
                    title="New Player"
                    onPress={handleNewPlayer}
                    variant="primary"
                    size="small"
                    iconName="plus"
                    textStyles={{ fontWeight: "bold" }}
                />
            </View>


            <PlayerList data={players} loading={loading} onDeleteGame={() => { }} onEditGame={() => { }} onDeletePlayer={() => { }} onEditPlayer={() => { }} />

            <Modal
                visible={modalVisible}
                message="Enter the player's name:"
                onCancel={() => setModalVisible(false)}
                onConfirm={handleConfirm}
                input={{ value: playerName, onChangeText: setPlayerName, iconName: 'account-plus' }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        flex: 1,
        padding: 16,
    },
    title: {
        color: colors.textColor,
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: colors.textColor,
        fontWeight: "bold",
        padding: 16,
    }
});