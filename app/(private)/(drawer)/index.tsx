import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import LinkButton from "../../../components/LinkButton";
import { colors } from "../../../theme/theme";
import { useAuth } from "../../../context/AuthProvider";
import LoadingScreen from "../../../components/LoadingScreen";
import { router } from "expo-router";

export default function Home() {
    const [userLoading, setUserLoading] = useState(true)
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (user) {
            setUserLoading(false);
        }
    }, [user]);

    if (isLoading || userLoading) {
        return <LoadingScreen />
    }

    const handleStartMatch = () => {
        router.push('/(private)/match'); // Ao entrar na tela de partida, o Drawer não deve ser exibido, uma nova Stack deve ser criada
    }

    return (
        <SafeAreaView style={styles.container}>
            {user &&
                <>
                    <ScrollView style={styles.contentContainer}>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Last Matches</Text>
                            {/* MatchCard */}
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Featured Players</Text>
                            {/* PlayerCard or PlayerTabel */}
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>More Information</Text>
                        </View>


                    </ScrollView>

                    <View style={styles.linkbtn}>
                        <LinkButton
                            title="Start Match"
                            onPress={handleStartMatch}
                            iconName="cards-playing"
                            variant="primary"
                        />
                    </View>
                </>
            }

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
    labelContainer: {
        justifyContent: 'flex-start',
        padding: 16,
        marginTop: 20,
    },
    label: {
        color: colors.textColor,
        fontSize: 25,
        fontWeight: 'bold',
    },
    linkbtn: {
        position: 'absolute',
        bottom: 50,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
})