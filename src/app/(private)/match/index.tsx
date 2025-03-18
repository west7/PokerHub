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
import { router } from 'expo-router';
import SearchBar from '../../../components/SearchBar';


export default function Match() {
    const styles = useThemedStyles(getStyles);
    const [gameSetups, setGameSetups] = useState<GameSetup[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedGameSetupName, setSelectedGameSetupName] = useState<string | null>(null);
    const [selectedPlayersId, setSelectedPlayersId] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

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

    const filteredData = searchQuery.trim() === ""
        ? players
        : players.filter((player) =>
            player.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const handleGo = () => {
        if (!selectedGameSetupName || selectedPlayersId.length === 0) {
            Toast.show({
                type: "error",
                text1: "Error!",
                text2: "Seleção incompleta",
            });
            return;
        }
        router.push({
            pathname: '/(private)/match/matchscreen',
            params: {
                gameSetup: selectedGameSetupName,
                playersId: JSON.stringify(selectedPlayersId),
            }
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

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder='Search...' />

            <View style={{ paddingHorizontal: 16, flex: 1 }}>
                <SelectList
                    data={filteredData}
                    loading={loading}
                    onClick={handleSelectPlayer}
                    selectedPlayersId={selectedPlayersId}
                    nestedScrollEnabled={true}
                    columns={1}
                />
            </View>

            <View style={styles.btn}>
                <LinkButton
                    title='Go'
                    onPress={handleGo}
                />
            </View>


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
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundColor,
        marginBottom: 50,
    }
});