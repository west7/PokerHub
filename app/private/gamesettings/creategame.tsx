import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, Button, Pressable } from "react-native";
import { colors } from "../../../interfaces/Colors";
import BackButton from "../../../components/BackButton";
import Input from "../../../components/Input";
import LinkButton from "../../../components/LinkButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

interface BlindLevel {
    level: number; // Nível do blind
    smallBlind: number; // Valor do Small Blind
    bigBlind: number; // Valor do Big Blind
}

interface GameSetup {
    name: string; // Nome do setup
    numWinners: number; // Quantidade de vencedores
    prizeDistribution: number[]; // Premiação em porcentagem para cada vencedor
    blindLevelTime: number; // Tempo de cada blind level em minutos
    initialBlindLevels: number; // Número inicial de blind levels
    blindLevels: BlindLevel[]; // Array de blind levels
}


export default function CreateGameScreen() {
    const [gameName, setGameName] = useState('');
    const [winnersNumber, setWinnersNumber] = useState('');
    const [prize, setPrize] = useState('');
    /* const [blindLevels, setBlindLevels] = useState(''); */
    const [timeForLevel, setTimeForLevel] = useState('');

    const [blindLevels, setBlindLevels] = useState([{ level: 1, smallBlind: '', bigBlind: '' }]);

    const [gameSetup, setGameSetup] = useState<GameSetup>({
        name: "",
        numWinners: 0,
        prizeDistribution: [],
        blindLevelTime: 0,
        initialBlindLevels: 0,
        blindLevels: [{ level: 1, smallBlind: 0, bigBlind: 0 }], // Valor inicial
    });


    const addBlindLevel = () => {
        setBlindLevels([...blindLevels, { level: blindLevels.length + 1, smallBlind: '', bigBlind: '' }]);
        console.log(blindLevels);
    };

    const handleBlindChange = (index: number, field: 'smallBlind' | 'bigBlind', value: number) => {
        const updatedLevels = blindLevels.map((level, i) =>
            i === index ? { ...level, [field]: value } : level
        );
        setBlindLevels(updatedLevels);
    };

    return (
        <View style={styles.container}>
            <BackButton />
            {/* just for web development */}

            <KeyboardAvoidingView
                style={styles.contentContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}/* Teste */
            >
                <ScrollView style={styles.contentContainer}>

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

                            <Text style={styles.text}>Number of levels:</Text>
                            <Input
                                style={styles.input}
                                placeholder="Ex: 15"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.text}>Prize for winner (%):</Text>
                            <Input
                                style={styles.input}
                                placeholder="Ex: 50, 30, 20"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />
                            <Text style={styles.text}>Time for level (min):</Text>
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

                    <View>
                        {blindLevels.map((level, index) => (
                            <>
                                <Text style={[styles.text, { padding: 0, marginLeft: 15 }]}>Level {level.level}</Text>
                                <View key={index} style={styles.inputContainer}>

                                    <View style={styles.inputBlock}>
                                        <Input
                                            style={styles.input}
                                            placeholder="Small Blind"
                                            value={level.smallBlind}
                                            onChangeText={(value) => handleBlindChange(index, 'smallBlind', parseInt(value))}
                                            containerStyle={{ padding: 5 }}
                                            iconName="poker-chip"
                                        />
                                    </View>

                                    <View style={styles.inputBlock}>
                                        <Input
                                            style={styles.input}
                                            placeholder="Big Blind"
                                            value={level.bigBlind}
                                            onChangeText={(value) => handleBlindChange(index, 'bigBlind', parseInt(value))}
                                            containerStyle={{ padding: 5 }}
                                            iconName="poker-chip"
                                        />
                                    </View>

                                </View>
                            </>
                        ))}

                        <Pressable onPress={addBlindLevel} style={styles.iconContainer}>
                            <Icon name="plus-circle-outline" color={colors.disabledColor} size={24} />
                            <Text style={[styles.text, { color: colors.disabledColor }]}>Add Blind Level</Text>
                        </Pressable>
                    </View>


                </ScrollView>
            </KeyboardAvoidingView>

            <LinearGradient
                colors={['transparent', '#12121288', '#121212']}
                style={styles.gradient}
            >
            </LinearGradient>

            <View style={styles.btn}>
                <LinkButton
                    title="Save"
                    onPress={() => console.log("Save")}
                />
            </View>

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
        alignItems: 'center',
        marginBottom: 30,
        zIndex: 10,
    },
    text: {
        color: colors.textColor,
        fontSize: 16,
        paddingBottom: 5,
        marginHorizontal: 5,
        marginTop: 7,
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
        color: colors.textColor,
        zIndex: 1,
        opacity: 1,
        borderWidth: 2,
        borderRadius: 7,
        borderColor: colors.textColor,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        marginBottom: 50,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30,
        height: 120,
    },
})