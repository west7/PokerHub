import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { AuthContext } from "../../../../context/AuthProvider";
import { colors } from "../../../../theme/theme";
import LinkButton from "../../../../components/LinkButton";
import { GameSetup } from "../../../../interfaces/game.interface";
import GamesList from "../../../../components/List";
import { deleteGame, getUserGames } from "../../../../services/game.services";
import Modal from "../../../../components/Modal";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";

export default function GameSettings() {
    const context = useContext(AuthContext);
    const [gameSetups, setGameSetups] = useState<GameSetup[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [gameToDelete, setGameToDelete] = useState<string | null>(null);


    if (!context) {
        throw new Error("User not found");
    }

    const { user } = context;

    const loadgames = (userId: string) => {
        setLoading(true);
        getUserGames(userId)
            .then((games) => {
                setGameSetups(games);
            })
            .catch((err) => {
                console.error('Error fetching games', err);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const handleEdit = (gameSetup: GameSetup) => {
        router.push({
            pathname: "/private/gamesettings/creategame",
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

    useFocusEffect(
        React.useCallback(() => {
            if (user) {
                loadgames(user.uid);
            }
        }, [user])
    );


    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.text}>Games</Text>
                <LinkButton
                    title="New Game"
                    onPress={() => router.push("/private/gamesettings/creategame")}
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
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        color: colors.textColor,
        fontWeight: "bold",
        padding: 16,
    },
    gameList: {
        padding: 0,
        flexGrow: 0,
        backgroundColor: colors.backgroundColor,
        borderRadius: 10,
    },
});