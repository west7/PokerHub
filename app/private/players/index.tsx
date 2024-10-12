import React, { useContext, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable, Alert, Button, Platform } from "react-native";
import { colors } from "../../../theme/theme";
import LinkButton from "../../../components/LinkButton";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { NavProps } from "../../../interfaces/type";
import ConfirmationModal from "../../../components/Modal";

export default function Players() {
    const context = useContext(AuthContext);
    const navigation = useNavigation<NavProps>();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [playerName, setPlayerName] = useState('');

    if (!context) {
        throw new Error("User not found");
    }
    const { user } = context;

    const showAlert = () => {
        if (Platform.OS === 'ios') {
            Alert.prompt("Player Name", "Enter the player's name", (text) => console.log(text));
        } else {
            setModalVisible(true);
        }
    }

    const handleConfirm = () => {
        console.log(playerName);
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.text}>Players Registered</Text>
                <LinkButton
                    title="New Player"
                    onPress={showAlert}
                    variant="primary"
                    size="small"
                    iconName="plus"
                    textStyles={{ fontWeight: "bold" }}
                />
            </View>


            {/* <PlayerList /> */}

            <ConfirmationModal
                visible={modalVisible}
                message="Enter the player's name:"
                onCancel={() => setModalVisible(false)}
                onConfirm={handleConfirm}
                input={{ value: playerName , onChangeText: setPlayerName }}
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