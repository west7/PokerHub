import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, Button, Pressable } from "react-native";
import { colors } from "../../../../theme/theme";
import Input from "../../../../components/Input";
import LinkButton from "../../../../components/LinkButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { BlindLevel, GameSetup } from "../../../../interfaces/game.interface";
import { FormContext, useForm } from "../../../../context/FormProvider";
import { useAuth } from "../../../../context/AuthProvider";
import { router, useLocalSearchParams } from "expo-router";
import { createGame, updateGame } from "../../../../services/game.services";
import BackButton from "../../../../components/BackButton";
import Toast from "react-native-toast-message";
interface Errors {
    gameName?: boolean;
    numberOfWinners?: boolean;
    prizeDistribution?: boolean;
    numberOfLevels?: boolean;
    timeForLevel?: boolean;
    blindLevels: { [key: number]: { smallBlind: boolean, bigBlind: boolean } };
}

export default function CreateGameScreen() {
    const [loading, setLoading] = useState(false);
    const { gameSetup } = useLocalSearchParams();
    const [errors, setErrors] = useState<Errors>({
        gameName: false,
        numberOfWinners: false,
        prizeDistribution: false,
        numberOfLevels: false,
        timeForLevel: false,
        blindLevels: {}
    });
    const [showErrors, setShowErrors] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const { user } = useAuth();
    const { formData, updateFormData, resetFormData } = useForm();

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

            const updatedErrors = { ...errors };
            Object.keys(updatedErrors.blindLevels).forEach((key) => {
                if (parseInt(key, 10) >= numberOfLevels) {
                    delete updatedErrors.blindLevels[parseInt(key, 10)];
                }
            });
            setErrors(updatedErrors);
        }

        updateFormData('blindLevels', updatedBlindLevels);
    }

    const validateBlindLevels = () => {
        const e: Errors = { blindLevels: errors.blindLevels };

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
        const e: Errors = { blindLevels: errors.blindLevels };

        if (formData.gameName === '') {
            setErrMessage('O nome do jogo não pode estar vazio');
            e.gameName = true;
        }

        const numberOfWinners = parseInt(formData.numberOfWinners, 10);

        const prizeDistribution = formData.prizeDistribution
            ? formData.prizeDistribution.split(',').map(Number)
            : [];

        if (formData.numberOfWinners !== '' || formData.prizeDistribution !== '') {

            if (isNaN(numberOfWinners) || numberOfWinners <= 0) {
                setErrMessage('O número de vencedores deve ser um número válido maior que 0');
                e.numberOfWinners = true;
            }

            if (prizeDistribution.length === 0) {
                setErrMessage('A distribuição de prêmios não pode estar vazia');
                e.prizeDistribution = true;
            }

            if (prizeDistribution.length !== numberOfWinners) {
                setErrMessage(`A distribuição de prêmios deve ter exatamente ${numberOfWinners} valores e deve ser separada por vírgulas`);
                e.prizeDistribution = true;
            }

            if (prizeDistribution.reduce((acc, value) => acc + value, 0) !== 100) {
                setErrMessage('A distribuição de prêmios deve somar 100');
                e.prizeDistribution = true;
            }
        }

        const numberOfLevels = parseInt(formData.numberOfLevels, 10);

        if (formData.numberOfLevels === '') {
            setErrMessage('O número de níveis não pode estar vazio');
            e.numberOfLevels = true;
        }
        if (isNaN(numberOfLevels) || numberOfLevels <= 0) {
            setErrMessage('O número de níveis deve ser um número válido maior que 0');
            e.numberOfLevels = true;
        }
        if (numberOfLevels !== formData.blindLevels.length) {
            setErrMessage('O número de níveis deve corresponder ao número de níveis de blind');
            e.numberOfLevels = true;
        }

        const timeForLevel = parseInt(formData.timeForLevel, 10);

        if (formData.timeForLevel === '') {
            setErrMessage('O tempo para cada nível não pode estar vazio');
            e.timeForLevel = true;
        }
        if (isNaN(timeForLevel) || timeForLevel <= 0) {
            setErrMessage('O tempo para cada nível deve ser um número válido maior que 0');
            e.timeForLevel = true;
        }
        if (!Number.isInteger(timeForLevel)) {
            setErrMessage('O tempo para cada nível deve ser um número inteiro');
            e.timeForLevel = true;
        }

        if (!validateBlindLevels()) {
            setErrMessage('Os níveis de blind têm valores inválidos');
        }

        setErrors(e);
    }

    const saveGameSetup = (userId: string, gameData: GameSetup) => {
        const otherErrors = Object.keys(errors).filter(key => key !== 'blindLevels').length > 0;
        const blindLevelsHasErrors = Object.keys(errors.blindLevels).length > 0;

        if (otherErrors || blindLevelsHasErrors) {
            setShowErrors(true);
            setShowToast(true);
            return;
        }
        setLoading(true);
        setShowErrors(false);

        if (gameSetup) {
            updateGame(userId, gameData)
                .then(() => {
                    Toast.show({
                        type: 'success',
                        text1: 'Success!',
                        text2: 'Game Setup editado com sucesso!',
                    });
                    router.back();
                })
                .catch((err) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Erro!',
                        text2: err.message
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
            return;
        }

        createGame(userId, gameData)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'Game Setup salvo com sucesso!',
                });
                router.back();
            })
            .catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro!',
                    text2: err.message
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleSave = () => {
        if (user?.uid) {
            saveGameSetup(user.uid, formData);
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'O ID do usuário não foi encontrado',
            });
        }
    }

    useEffect(handleErrors, [formData]);

    useEffect(() => {
        if (errMessage && showToast) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: errMessage,
            });
        }
    }, [errMessage, showToast]);

    useEffect(() => {
        if (gameSetup) {

            const gameSetupString = Array.isArray(gameSetup) ? gameSetup[0] : gameSetup;
            const parsedGameSetup = JSON.parse(gameSetupString) as GameSetup;

            updateFormData('gameName', parsedGameSetup.gameName);
            updateFormData('numberOfWinners', parsedGameSetup.numberOfWinners);
            updateFormData('prizeDistribution', parsedGameSetup.prizeDistribution);
            updateFormData('numberOfLevels', parsedGameSetup.numberOfLevels);
            updateFormData('timeForLevel', parsedGameSetup.timeForLevel);

            if (parsedGameSetup.blindLevels && parsedGameSetup.blindLevels.length > 0) {
                updateFormData('blindLevels', parsedGameSetup.blindLevels.map((blindLevel, index) => ({
                    level: index + 1,
                    smallBlind: blindLevel.smallBlind || '',
                    bigBlind: blindLevel.bigBlind || ''
                })));
            }
        }

        return () => {
            if (gameSetup) {
                resetFormData();  // Limpa o formulário ao sair da tela em modo de edição
            }
        }
    }, [gameSetup]);


    return (
        <View style={styles.container}>

            {Platform.OS === 'ios'
                ?
                <View style={styles.modalBar} />
                :
                <BackButton />
            }

            <KeyboardAvoidingView
                style={styles.contentContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
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

           

            <View style={styles.btn}>
                <LinkButton
                    title="Save"
                    onPress={handleSave}
                    isLoading={loading}
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
        marginBottom: 20,
        zIndex: 10,
    },
    text: {
        color: "#aaa",
        fontSize: 14,
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
        bottom: 20,
        height: 100,
    },
    modalBar: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginVertical: 15,
    },
})