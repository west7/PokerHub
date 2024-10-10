import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";
import { AuthContext } from "../../../context/AuthProvider";
import { colors } from "../../../interfaces/Colors";
import LinkButton from "../../../components/LinkButton";
import { NavProps } from "../../../interfaces/type";
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { GameSetup } from "../../../interfaces/game.interface";

const db = FIREBASE_DB;
const auth = FIREBASE_AUTH;

export default function GameSettings() {
    const context = useContext(AuthContext);
    const navigation = useNavigation<NavProps>();
    const [gameSetups, setGameSetups] = useState<GameSetup[]>([]);
    const [loading, setLoading] = useState(true);

    if (!context) {
        throw new Error("User not found");
    }

    const { user } = context;

    const getUserGames = async (userId: string) => {
        try {
            const gameSettingsRef = collection(db, "users", userId, "gamesettings");
            const query = await getDocs(gameSettingsRef);

            const games: GameSetup[] = query.docs.map(doc => doc.data() as GameSetup)
            return games;
        } catch (err) {
            console.error('Error fetching games',err);
            return [];
        }
    }

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

            <Text style={styles.text}>Games List</Text>

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