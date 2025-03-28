import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import LinkButton from "../../../../components/LinkButton";
import { AuthContext, useAuth } from "../../../../context/AuthProvider";
import { useFocusEffect } from "@react-navigation/native";
import Modal from "../../../../components/Modal";
import { Player } from "../../../../interfaces/player.interface";
import { createPlayer, deletePlayer, getUserPlayers, updatePlayer } from "../../../../services/players.services";
import PlayerList from "../../../../components/List";
import Toast from "react-native-toast-message";
import useThemedStyles from "../../../../context/ThemeProvider";
import { Theme } from "../../../../theme/theme";

const inititalPlayer: Player = {
    playerId: '',
    name: '',
    totalBalance: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    lastTransaction: 0,
}

export default function Players() {
    const context = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerName, setPlayerName] = useState('');
    const [newPlayer] = useState(inititalPlayer);
    const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState<string | null>(null);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);

    const { user } = useAuth();
    const styles = useThemedStyles(getStyles);

    const handleNewPlayer = () => {
        if (Platform.OS === 'ios') {
            Alert.prompt("Player name", "Enter the player's name", (playerName) => {
                if (playerName) {
                    handleCreatePlayer({
                        ...newPlayer,
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

                    const newPlayer = { ...playerData, playerId: playerId };
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

    const handleEditPlayer = (player: Player) => {
        setLoading(true);
        if (Platform.OS === 'ios') {
            Alert.prompt("Edit Player", "What is the new player name?", (playerName) => {
                if (playerName) {
                    setPlayerName(playerName);
                    setPlayerToEdit({ ...player, name: playerName });
                    handleConfirmEditPrompt(player, playerName);
                }
            }
            )
        } else {
            setPlayerToEdit(player);
            setModalEditVisible(true);
        }

        setLoading(false);
    }

    const handleDeletePlayer = (playerId: string) => {
        setLoading(true);
        Platform.OS === 'web' ?
            (setModalConfirmationVisible(true))
            :
            (Alert.alert(
                "Delete Player",
                "Are you sure you want to delete this player?",
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


    const handleConfirmCreate = () => {
        handleCreatePlayer({ ...newPlayer, name: playerName });
        setModalVisible(false);
    }

    const handleConfirmEdit = () => {
        setLoading(true);
        if (user?.uid && playerToEdit?.playerId) {
            updatePlayer(user?.uid, { ...playerToEdit, name: playerName })
                .then(() => {
                    loadPlayers(user.uid);
                })
                .catch((err) => {
                    console.error('Error updating player', err);
                })
        } else {
            console.error('User ID or Player ID is missing');
        }

        setModalEditVisible(false);
        setLoading(false);
    }

    const handleConfirmEditPrompt = (player: Player, newName: string) => {
        setLoading(true);
        if (user?.uid && player?.playerId) {
            updatePlayer(user?.uid, { ...player, name: newName })
                .then(() => {
                    loadPlayers(user.uid);
                })
                .catch((err) => {
                    console.error('Error updating player', err);
                })
        } else {
            console.error('User ID or Player ID is missing');
        }

        setLoading(false);
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
                Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Erro ao buscar jogadores: " + err.message,
                });
            })
            .finally(() => {
                setLoading(false)
            });
    }

    useEffect(() => {
            if (user) {
                loadPlayers(user.uid);
            }
        }, [user]);

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

            <PlayerList
                data={players}
                loading={loading}
                onDelete={handleDeletePlayer}
                onEdit={handleEditPlayer}
                onScrollDown={() => loadPlayers(user?.uid || '')}
                containerStyle={styles.playerList}
            />

            <Modal
                visible={modalVisible}
                message="Enter the player's name:"
                onCancel={() => setModalVisible(false)}
                onConfirm={handleConfirmCreate}
                input={{ value: playerName, onChangeText: setPlayerName, iconName: 'account-plus' }}
            />

            <Modal
                visible={modalEditVisible}
                message="What the new player's name:"
                onCancel={() => setModalEditVisible(false)}
                onConfirm={handleConfirmEdit}
                input={{ value: playerName, onChangeText: setPlayerName }}
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

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        flex: 1,
        padding: 16,
    },
    title: {
        color: theme.textColor,
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        color: theme.textColor,
        fontWeight: "bold",
        padding: 16,
    },
    playerList: {
        padding: 0,
        flexGrow: 0,
        backgroundColor: theme.backgroundColor,
    }
});