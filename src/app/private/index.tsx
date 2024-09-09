import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OptionButton from "../components/OptionButton";
import LinkButton from "../components/LinkButton";
import BackButton from "../components/BackButton";

export default function Main() {



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <Pressable onPress={() => console.log('menu')}>
                        <Icon name="menu" size={30} color={"#f0f0f0"} />
                    </Pressable>
                </View>

                <View style={styles.nameContainer}>
                    <Icon name="account-circle" size={40} color={"#f0f0f0"} style={styles.icon} />
                    <Text style={styles.name}>Guilherme Westphall</Text>
                </View>

                <View style={styles.buttons}>
                    <OptionButton placeholder="Game Settings" iconName="cog" onPress={() => console.log('Settings')} />

                    <OptionButton placeholder="Players" iconName="account-group" onPress={() => console.log('Players')} />

                    <OptionButton placeholder="History" iconName="history" onPress={() => console.log('History')} />

                    <OptionButton placeholder="Statistics" iconName="trending-up" onPress={() => console.log('Statistics')} />
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
        backgroundColor: "#121212",
        height: "100%",
        width: "100%",
    },
    nameContainer: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    name: {
        color: "#f0f0f0",
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