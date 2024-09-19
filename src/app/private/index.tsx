import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OptionButton from "../components/OptionButton";
import LinkButton from "../components/LinkButton";
import { router } from 'expo-router';
import { User } from "firebase/auth";
import { colors } from "../interfaces/Colors";

export default function Index() {
    const [user, setUser] = useState<User | null>(null);

    const getUser = () => {
        
    }

    const handleGameSettings = () => {
        router.push('../private/gamesettings');
    }

    const handlePlayers = () => {
        router.push('../private/players');
    }

    const handleHistory = () => {
        router.push('../private/history');
    }

    const handleStatistics = () => {
        router.push('../private/statistics');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <Pressable onPress={() => console.log('menu')}>
                        <Icon name="menu" size={30} color={colors.textColor} />
                    </Pressable>
                </View>

                <View style={styles.nameContainer}>
                    <Icon name="account-circle" size={40} color={colors.textColor} style={styles.icon} />
                    <Text style={styles.name}>Guilherme Westphall</Text>
                </View>

                <View style={styles.buttons}>
                    <OptionButton placeholder="Game Settings" iconName="cog" onPress={handleGameSettings} />

                    <OptionButton placeholder="Players" iconName="account-group" onPress={handlePlayers} />

                    <OptionButton placeholder="History" iconName="history" onPress={handleHistory} />

                    <OptionButton placeholder="Statistics" iconName="trending-up" onPress={handleStatistics} />
                </View>

                <View style={styles.linkbtn}>
                    <LinkButton title="Start Match" onPress={() => console.log('começou')} iconName="cards-playing" variant="outline" />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundColor,
        height: "100%",
        width: "100%",
    },
    nameContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    name: {
        color: colors.textColor,
        fontSize: 25,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 10,
        marginLeft: 30,
    },
    buttons: {
        margin: 10,
        marginTop: 40,
    },
    linkbtn: {
        marginTop: 120,
        alignItems: 'center',
    },
    header: {
        height: "10%",
        justifyContent: 'flex-start',
        padding: 16,
    }
})