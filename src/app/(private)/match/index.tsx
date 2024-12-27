import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BackButton from "../../../components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "../../../theme/theme";
import useThemedStyles from "../../../context/ThemeProvider";
import List from "../../../components/List";
import { GameSetup } from "../../../interfaces/game.interface";
import { Player } from "../../../interfaces/player.interface";
import { useAuth } from "../../../context/AuthProvider";
import { getUserGames } from "../../../services/game.services";
import Toast from "react-native-toast-message";
import { getUserPlayers } from "../../../services/players.services";
import SelectList from '../../../components/SelectList';
import LinkButton from '../../../components/LinkButton';


export default function Match() {
    const styles = useThemedStyles(getStyles);
    const [gameSetups, setGameSetups] = useState<GameSetup[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedGameSetupName, setSelectedGameSetupName] = useState<string | null>(null);
    const [selectedPlayersId, setSelectedPlayersId] = useState<string[]>([]);

    const { user } = useAuth();

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

    const handleSelectGame = (game: GameSetup) => {
        setSelectedGameSetupName((prevSelected) => {
            if (prevSelected === game.gameName) {
                return null;
            }
            return game.gameName;
        });
    }

    const handleSelectPlayer = (player: Player) => {
        setSelectedPlayersId((prevSelected) => {
            if (prevSelected.includes(player.playerId)) {
                return prevSelected.filter((id) => id !== player.playerId);
            }
            return [...prevSelected, player.playerId];

        });
    }

    useEffect(() => {
        if (user) {
            loadgames(user.uid);
            loadPlayers(user.uid);
        }
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <View>
                    <BackButton />
                    <Text style={styles.title}>Select the Game Setup</Text>
                </View>

                <View style={{ paddingHorizontal: 16 }}>
                    <SelectList
                        data={gameSetups}
                        loading={loading}
                        horizontal
                        onClick={handleSelectGame}
                        selectedGameName={selectedGameSetupName}
                        selectedPlayersId={[]}
                    />
                </View>


                <Text style={[styles.title, { marginTop: 20 }]}>Select the players</Text>

                <View style={{ paddingHorizontal: 16 }}>
                    <SelectList
                        data={players}
                        loading={loading}
                        onClick={handleSelectPlayer}
                        selectedPlayersId={selectedPlayersId}
                        scrollEnabled={false}
                    />
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                }}>
                    <LinkButton
                        title='Go'
                    />
                </View>
                
            </ScrollView>

        </SafeAreaView>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundColor,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.textColor,
        padding: 16,
    },
    gameList: {
    },
});