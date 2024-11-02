import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { useAuth } from "../../../../context/AuthProvider";
import LinkButton from "../../../../components/LinkButton";
import { GameSetup } from "../../../../interfaces/game.interface";
import GamesList from "../../../../components/List";
import { deleteGame, getUserGames } from "../../../../services/game.services";
import Modal from "../../../../components/Modal";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Theme } from "../../../../theme/theme";
import useThemedStyles from "../../../../context/ThemeProvider";

export default function GameSettings() {
    const [gameSetups, setGameSetups] = useState<GameSetup[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [gameToDelete, setGameToDelete] = useState<string | null>(null);

    const { user } = useAuth();

    const styles = useThemedStyles(getStyles);

    const loadgames = (userId: string) => {
        setLoading(true);
        getUserGames(userId)
            .then((games) => {
                setGameSetups(games);
            })
            .catch((err) => {
                Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Erro ao buscar jogos: " + err.message,
                });
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const handleEdit = (gameSetup: GameSetup) => {
        router.push({
            pathname: "/(private)/(drawer)/gamesettings/creategame",
            params: { gameSetup: JSON.stringify(gameSetup) }
        });
    }

    const handleDelete = (gameName: string) => {
        setLoading(true);
        Platform.OS === 'web' ?
            (setModalVisible(true))
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
                                deleteGame(user.uid, gameName);
                                loadgames(user.uid);
                                setLoading(false);
                            } else {
                                console.error("User ID is undefined");
                            }
                        },
                        style: "destructive"
                    }
                ]
            ))
        setGameToDelete(gameName);
        setLoading(false);
    }

    const handleConfirm = () => {
        setLoading(true);
        if (user?.uid && gameToDelete) {
            deleteGame(user.uid, gameToDelete);
            loadgames(user.uid);
        }
        setLoading(false);
        setModalVisible(false);
    }

    useEffect(() => {
            if (user) {
                loadgames(user.uid);
            }
        }, [user]);


    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.text}>Games</Text>
                <LinkButton
                    title="New Game"
                    onPress={() => router.push("/(private)/(drawer)/gamesettings/creategame")}
                    variant="primary"
                    size="small"
                    iconName="plus"
                    textStyles={{ fontWeight: "bold" }}
                />
            </View>

            <GamesList
                data={gameSetups}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                containerStyle={styles.gameList}
                onScrollDown={() => loadgames(user?.uid || "")}
            />

            <Modal
                visible={modalVisible}
                message="Are you sure you want to delete this game?"
                onCancel={() => setModalVisible(false)}
                onConfirm={handleConfirm}
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
    gameList: {
        padding: 0,
        flexGrow: 0,
        backgroundColor: theme.backgroundColor,
        borderRadius: 10,
    },
});