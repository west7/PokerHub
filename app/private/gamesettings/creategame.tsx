import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, Button, Pressable } from "react-native";
import { colors } from "../../../interfaces/Colors";
import BackButton from "../../../components/BackButton";
import Input from "../../../components/Input";
import LinkButton from "../../../components/LinkButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { BlindLevel } from "../../../interfaces/game.interface";
import { FormContext } from "../../../context/FormProvider";

interface Errors {
    gameName?: boolean;
    numberOfWinners?: boolean;
    prizeDistribution?: boolean;
    numberOfLevels?: boolean;
    timeForLevel?: boolean;
    blindLevels: { [key: number]: { smallBlind: boolean, bigBlind: boolean } };
}

export default function CreateGameScreen() {
    const [errors, setErrors] = useState<Errors>({
        gameName: false,
        numberOfWinners: false,
        prizeDistribution: false,
        numberOfLevels: false,
        timeForLevel: false,
        blindLevels: {}
    });
    const [showErrors, setShowErrors] = useState(false);

    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error('formContext must be used within a FormProvider');
    }

    const { formData, updateFormData } = formContext;


    const addBlindLevel = () => {
        const newLevel: BlindLevel = { level: formData.blindLevels.length + 1, smallBlind: '', bigBlind: '' };

        updateFormData('numberOfLevels', (parseInt(formData.numberOfLevels, 10) + 1).toString());
        updateFormData('blindLevels', [...formData.blindLevels, newLevel]);
    };

    const handleBlindChange = (index: number, field: 'smallBlind' | 'bigBlind', value: string) => {
        const updatedBlindLevels = formData.blindLevels.map((level, i) =>
            i === index ? { ...level, [field]: value } : level
        );
        updateFormData('blindLevels', updatedBlindLevels);
    };

    const handleNumberOfLevelsChange = (value: string) => {
        const numberOfLevels = parseInt(value, 10) || 0;
        updateFormData('numberOfLevels', value);

        let updatedBlindLevels: BlindLevel[] = [...formData.blindLevels];
        if (numberOfLevels > updatedBlindLevels.length) {
            for (let i = updatedBlindLevels.length; i < numberOfLevels; i++) {
                updatedBlindLevels.push({ level: i + 1, smallBlind: '', bigBlind: '' });
            }
        } else if (numberOfLevels < updatedBlindLevels.length) {
            updatedBlindLevels = updatedBlindLevels.slice(0, numberOfLevels);
        }

        updateFormData('blindLevels', updatedBlindLevels);
    }

    const validateBlindLevels = () => {
        const e: Errors = {blindLevels: errors.blindLevels};

        formData.blindLevels.forEach((level, index) => {
            const smallBlindError = level.smallBlind === '' || isNaN(parseInt(level.smallBlind, 10));
            const bigBlindError = level.bigBlind === '' || isNaN(parseInt(level.bigBlind, 10));

            if (!e.blindLevels) {
                e.blindLevels = {};
            }

            if (smallBlindError || bigBlindError) {
                e.blindLevels[index] = {
                    smallBlind: smallBlindError,
                    bigBlind: bigBlindError,
                };
            } else {
                // Remove o erro se não houver problemas neste nível
                delete e.blindLevels[index];
            }
        });

        setErrors(e);
        return Object.keys(e).length === 0;
    }

    const handleErrors = () => {
        const e: Errors = {blindLevels: errors.blindLevels};

        if (formData.gameName === '') {
            //console.error('Game name cannot be empty');
            e.gameName = true;
        } 

        const numberOfWinners = parseInt(formData.numberOfWinners, 10);
        const prizeDistribution = formData.prizeDistribution.split(',').map(Number);

        if (formData.numberOfWinners !== '' || formData.prizeDistribution !== '') {

            if (isNaN(numberOfWinners) || numberOfWinners <= 0) {
                //console.error('Number of winners must be a valid number greater than 0');
                e.numberOfWinners = true;
            }

            if (prizeDistribution.length === 0) {
                //console.error('Prize distribution cannot be empty');
                e.prizeDistribution = true;
            }

            if (prizeDistribution.length !== numberOfWinners) {
                //console.error(`Prize distribution must have exactly ${numberOfWinners} values and must be separated by commas`);
                e.prizeDistribution = true;
            }
        }

        const numberOfLevels = parseInt(formData.numberOfLevels, 10);

        if (formData.numberOfLevels === '') {
            //console.error('Number of levels cannot be empty');
            e.numberOfLevels = true;
        } else if (isNaN(numberOfLevels) || numberOfLevels <= 0) {
            //console.error('Number of levels must be a valid number greater than 0');
            e.numberOfLevels = true;
        } else if (numberOfLevels !== formData.blindLevels.length) {
            //console.error('Number of levels must match the number of blind levels');
            e.numberOfLevels = true;
        }

        const timeForLevel = parseInt(formData.timeForLevel, 10);

        if (formData.timeForLevel === '') {
            //console.error('Time for level cannot be empty');
            e.timeForLevel = true;
        } else if (isNaN(timeForLevel) || timeForLevel <= 0) {
            //console.error('Time for level must be a valid number greater than 0');
            e.timeForLevel = true;
        } else if (!Number.isInteger(timeForLevel)) {
            //console.error('Time for level must be an integer number');
            e.timeForLevel = true
        }

        if (!validateBlindLevels()) {
            //console.error('Blind levels have invalid values');
        }

        setErrors(e);
    }

    const saveGameSetup = () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
            return;
        }
        console.log('Saving game setup:', formData);
    }

    useEffect(handleErrors, [formData]);

    // TODO: Salvar no banco de dados

    return (
        <View style={styles.container}>
            {/* just for web development */}
            <View style={styles.modalBar} />

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
                            err={showErrors ? errors.gameName : false}
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
                                err={showErrors ? errors.numberOfWinners : false}
                            />

                            <Text style={styles.text}>Number of levels:</Text>
                            <Input
                                value={formData.numberOfLevels}
                                onChangeText={(value) => handleNumberOfLevelsChange(value)}
                                inputMode="numeric"
                                style={styles.input}
                                placeholder="Ex: 15"
                                placeholderTextColor={colors.disabledColor}
                                containerStyle={{ padding: 5 }}
                                err={showErrors ? errors.numberOfLevels : false}
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
                                err={showErrors ? errors.prizeDistribution : false}
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
                                err={showErrors ? errors.timeForLevel : false}
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
                                            err={showErrors ? errors.blindLevels[index]?.smallBlind : false}
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
                                            err={showErrors ? errors.blindLevels[index]?.bigBlind : false}
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
                    onPress={saveGameSetup}
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
    modalBar: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginVertical: 10, // Ajusta o espaço acima/abaixo da barra
    },
})