import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import { colors } from "../../../interfaces/Colors";
import BackButton from "../../../components/BackButton";
import Input from "../../../components/Input";
import LinkButton from "../../../components/LinkButton";

export default function CreateGameScreen() {
    const [gameName, setGameName] = useState("");
    const [winnersNumber, setWinnersNumber] = useState('');
    const [prize, setPrize] = useState('');
    const [blindLevels, setBlindLevels] = useState('');
    const [timeForLevel, setTimeForLevel] = useState('');

    return (
        <View style={styles.container}>
            <BackButton />
            {/* just for web development */}

            <KeyboardAvoidingView
                style={styles.contentContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}/* Teste */ 
            >
                <ScrollView>

                    <View>
                        <Text style={styles.title}>Insert Information</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.text}>Name for the game setup:</Text>
                        <Input
                            placeholder="Ex: Tournament 1"
                            value={gameName}
                            onChangeText={setGameName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.text}>Number of winners:</Text>
                            <Input
                                style={styles.input}
                                placeholder="Ex: 3"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />

                            <Text style={styles.text}>Number of blind levels:</Text>
                            <Input
                                style={styles.input}
                                placeholder="Ex: 15"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.text}>Prize for each winner (%):</Text>
                            <Input
                                style={styles.input}
                                placeholder="Ex: 50, 30, 20"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />
                            <Text style={styles.text}>Time for each level (min):</Text>
                            <Input
                                style={styles.input}
                                placeholder="Ex: 20"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.title}>Blind Levels: </Text>
                    </View>

                    {/* Generate Multiple Blind Levels */}

                    <View style={styles.btn}>
                        <LinkButton
                            title="Save"
                            onPress={() => console.log("Save")}
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    title: {
        fontSize: 20,
        color: colors.textColor,
        fontWeight: "bold",
        padding: 16,
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        marginHorizontal: 10,
    },
    btn: {
        alignItems: "center",
    },
    text: {
        color: colors.textColor,
        fontSize: 16,
        paddingBottom: 5,
        marginHorizontal: 5,
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputBlock: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    input: {
        flex: 1,
        fontSize: 16,
        width: "100%",
        color: colors.textColor,
        height: "100%",
        zIndex: 1,
        opacity: 1,
        borderWidth: 2,
        borderRadius: 7,
        borderColor: colors.textColor,
        padding: 5,
    },
})