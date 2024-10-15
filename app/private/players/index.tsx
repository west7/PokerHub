import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { colors } from "../../../theme/theme";
import LinkButton from "../../../components/LinkButton";
import { AuthContext } from "../../../context/AuthProvider";
import { useFocusEffect } from "@react-navigation/native";
import Modal from "../../../components/Modal";
import { Player } from "../../../interfaces/player.interface";
import { createPlayer, deletePlayer, getUserPlayers } from "../../../services/players.services";
import PlayerList from "../../../components/List";

const inititalPlayer: Player = {
    playerId: '',
    name: '',
    totalBalance: 100,
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
    const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState<string | null>(null);

    if (!context) {
        throw new Error("User not found");
    }
    const { user } = context;

    const handleNewPlayer = () => {
        if (Platform.OS === 'ios') {
            Alert.prompt("Player name", "Enter the player's name", (playerName) => {
                if (playerName) {
                    handleCreatePlayer({
                        ...playerData,
                        name: playerName,
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
                .then((playerId) => {
                    if (!playerId) {
                        throw new Error('Player ID is undefined');
                    }

                    const newPlayer = { ...playerData, playerId: playerId};
                    setPlayers((prev) => [...prev, newPlayer]);

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

    const handleEditPlayer = (playerId: Player) => {

    }

    const handleDeletePlayer = (playerId: string) => {
        setLoading(true);
        Platform.OS === 'web' ?
            (setModalConfirmationVisible(true))
            :
            (Alert.alert(
                "Delete Game",
                "Are you sure you want to delete this game?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: () => {
                            if (user?.uid) {
                                setLoading(true);
                                deletePlayer(user.uid, playerId);
                                loadPlayers(user.uid);
                                setLoading(false);
                            } else {
                                console.error("User ID is undefined");
                            }
                        },
                        style: "destructive"
                    }
                ]
            ))
        setPlayerToDelete(playerId);
        setLoading(false);
    }


    const handleConfirm = () => {
        console.log(playerData);
        handleCreatePlayer({ ...playerData, name: playerName });
        setModalVisible(false);
    }

    const handleConfirmDelete = () => {
        setLoading(true);
        if (user?.uid && playerToDelete) {
            deletePlayer(user.uid, playerToDelete);
            loadPlayers(user.uid);
        }
        setLoading(false);
        setModalConfirmationVisible(false);
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

            {/* Ajustar estilos do Player Card e ver o que é possível fazer sobre essas funções inúteis */}

            <PlayerList data={players} loading={loading} onDelete={handleDeletePlayer} onEdit={handleEditPlayer} />

            <Modal
                visible={modalVisible}
                message="Enter the player's name:"
                onCancel={() => setModalVisible(false)}
                onConfirm={handleConfirm}
                input={{ value: playerName, onChangeText: setPlayerName, iconName: 'account-plus' }}
            />

            <Modal
                visible={modalConfirmationVisible}
                message="Are you sure you want to delete this player?"
                onCancel={() => setModalConfirmationVisible(false)}
                onConfirm={handleConfirmDelete}
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