import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable, Alert, Platform } from "react-native";
import { AuthContext } from "../../../context/AuthProvider";
import { colors } from "../../../interfaces/Colors";
import LinkButton from "../../../components/LinkButton";
import { NavProps } from "../../../interfaces/type";
import { useNavigation } from '@react-navigation/native';
import { GameSetup } from "../../../interfaces/game.interface";
import GamesList from "../../../components/GamesList";
import { deleteGame, getUserGames } from "../../../services/game.services";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { useFocusEffect } from "@react-navigation/native";

export default function GameSettings() {
    const context = useContext(AuthContext);
    const navigation = useNavigation<NavProps>();
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

    const handleEdit = () => {
        console.log('Editar');
        // Abrir no creategame.tsx
    }

    const handleDelete = (gameName: string) => {
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
                <Text style={styles.text}>My games</Text>
                <LinkButton
                    title="New Game"
                    onPress={() => navigation.navigate("CreateGame")}
                    variant="primary"
                    size="small"
                    iconName="plus"
                    textStyles={{ fontWeight: "bold" }}
                />
            </View>

            <GamesList gamesList={gameSetups} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />

            <ConfirmationModal
                visible={modalVisible}
                message="Are you sure you want to delete this game?"
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    setLoading(true);
                    if (user?.uid && gameToDelete) {
                        deleteGame(user.uid, gameToDelete);
                        loadgames(user.uid);
                    }
                    setLoading(false);
                    setModalVisible(false); 
                }}
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