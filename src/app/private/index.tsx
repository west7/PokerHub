import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OptionButton from "../components/OptionButton";
import LinkButton from "../components/LinkButton";
import { Redirect, router } from 'expo-router';
import { colors } from "../interfaces/Colors";
import { AuthContext } from "../context/AuthProvider";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
    const [userLoading, setUserLoading] = useState(true)
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("User not found");
    }

    const { user, loading } = context;

    useEffect(() => {
        if (user) {
            setUserLoading(false);
        }
    }, [user]);

    if (loading || userLoading) {
        return <LoadingScreen />
    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.contentContainer}>

                <View style={styles.nameContainer}>
                    <Icon name="account-circle" size={40} color={colors.textColor} style={styles.icon} />

                    { user && <Text style={styles.name}>{user.name}</Text>}
                </View>

            </ScrollView>

            <View style={styles.linkbtn}>
                <LinkButton title="Start Match" onPress={() => console.log('começou')} iconName="cards-playing" variant="primary" />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainer: {
        flex: 1,
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
        position: 'absolute',
        bottom: 50,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        height: "10%",
        justifyContent: 'flex-start',
        padding: 16,
    }
})