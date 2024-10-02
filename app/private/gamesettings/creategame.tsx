import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, Button, Pressable } from "react-native";
import { colors } from "../../../interfaces/Colors";
import BackButton from "../../../components/BackButton";
import Input from "../../../components/Input";
import LinkButton from "../../../components/LinkButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { BlindLevel, GameSetup } from "../../../interfaces/game.interface";
import { FormContext } from "../../../context/FormProvider";

export default function CreateGameScreen() {

    /*const [gameSetup, setGameSetup] = useState<GameSetup>({
        name: "",
        numWinners: 0,
        prizeDistribution: [],
        blindLevelTime: 0,
        initialBlindLevels: 0,
        blindLevels: [{ level: 1, smallBlind: 0, bigBlind: 0 }], 
        }); */

    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error('formContext must be used within a FormProvider');
    }

    const { formData, updateFormData, updateBlindLevel } = formContext;


    const addBlindLevel = () => {
        const newLevel : BlindLevel = { level: formData.blindLevels.length + 1, smallBlind: '', bigBlind: '' };
        updateFormData('blindLevels', [...formData.blindLevels, newLevel]);
    };

    const handleBlindChange = (index: number, field: 'smallBlind' | 'bigBlind', value: string) => {
        const updatedBlindLevels = formData.blindLevels.map((level, i) => 
            i === index ? { ...level, [field]: value } : level
        );
        updateFormData('blindLevels', updatedBlindLevels);
    };

    // TODO: Fazer a verificação dos campos
    // TODO: Salvar no banco de dados
    // TODO: Estilizar o modal?

    return (
        <View style={styles.container}>
            <BackButton></BackButton>
            {/* just for web development */}

            <KeyboardAvoidingView
                style={styles.contentContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}/* Teste */
            >
                <ScrollView style={styles.contentContainer}>

                    <View>
                        <Text style={styles.title}>Insert Information</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.text}>Name for the game setup:</Text>
                        <Input
                            placeholder="Ex: Tournament 1"
                            value={formData.gameName}
                            onChangeText={(value) => updateFormData('gameName', value)}
                            inputMode="text"
                        />
                    </View>

                    <View style={styles.inputContainer}>

                        <View style={styles.inputBlock}>
                            <Text style={styles.text}>Number of winners:</Text>
                            <Input
                                value={formData.numberOfWinners}
                                onChangeText={(value) => updateFormData('numberOfWinners', value)}
                                inputMode="numeric"
                                style={styles.input}
                                placeholder="Ex: 3"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />

                            <Text style={styles.text}>Number of levels:</Text>
                            <Input
                                value={formData.numberOfLevels}
                                onChangeText={(value) => updateFormData('numberOfLevels', value)}
                                inputMode="numeric"
                                style={styles.input}
                                placeholder="Ex: 15"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.text}>Prize for winner (%):</Text>
                            <Input
                                value={formData.prizeDistribution}
                                onChangeText={(value) => updateFormData('prizeDistribution', value)}
                                style={styles.input}
                                placeholder="Ex: 50, 30, 20"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                            />
                            <Text style={styles.text}>Time for level (min):</Text>
                            <Input
                                value={formData.timeForLevel}
                                onChangeText={(value) => updateFormData('timeForLevel', value)}
                                inputMode="numeric"
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
                        {formData.blindLevels.map((level, index) => (
                            <React.Fragment key={index}>
                                <Text style={[styles.text, { padding: 0, marginLeft: 15 }]}>Level {level.level}</Text>
                                <View style={styles.inputContainer}>

                                    <View style={styles.inputBlock}>
                                        <Input
                                            style={styles.input}
                                            placeholder="Small Blind"
                                            inputMode="numeric"
                                            value={level.smallBlind}
                                            onChangeText={(value) => handleBlindChange(index, 'smallBlind', value)}
                                            containerStyle={{ padding: 5 }}
                                            iconName="poker-chip"
                                        />
                                    </View>

                                    <View style={styles.inputBlock}>
                                        <Input
                                            style={styles.input}
                                            placeholder="Big Blind"
                                            inputMode="numeric"
                                            value={level.bigBlind}
                                            onChangeText={(value) => handleBlindChange(index, 'bigBlind', value)}
                                            containerStyle={{ padding: 5 }}
                                            iconName="poker-chip"
                                        />
                                    </View>

                                </View>
                            </React.Fragment>
                        ))}

                        <Pressable onPress={addBlindLevel} style={styles.iconContainer}>
                            <Icon name="plus-circle-outline" color={colors.disabledColor} size={24} />
                            <Text style={[styles.text, { color: colors.disabledColor }]}>Add Blind Level</Text>
                        </Pressable>
                    </View>


                </ScrollView>
            </KeyboardAvoidingView>

            <LinearGradient
                colors={['transparent', '#12121299', colors.backgroundColor]}
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
        backgroundColor: 'transparent',
        color: 'transparent',
    },
    text: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: '700',
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
        marginBottom: 50,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30,
        height: 110,
    },
})