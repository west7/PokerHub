import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { colors } from "../theme/theme";
import Input from "./Input";

interface InputModelProps {
    value: string;
    onChangeText: (text: string) => void;
}
interface ConfirmationModalProps {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    input?: InputModelProps;
}

export default function ConfirmationModal({
    visible,
    message,
    onConfirm,
    onCancel,
    input }: ConfirmationModalProps) {
    const [inputValue, setInputValue] = useState(input?.value || '');

    useEffect(() => {
        if (!visible) {
            setInputValue('');
        }
    }, [visible]);

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.messageText}>{message}</Text>

                    {input && (
                        <View style={styles.inputContainer}>
                            <Input
                                clearButtonMode="while-editing"
                                autoCapitalize="words"
                                inputMode="text"
                                style={styles.input}
                                placeholder={inputValue}
                                value={inputValue}
                                onChangeText={(text) => {
                                    setInputValue(text);
                                    input.onChangeText(text);
                                }}
                                containerStyle={{ padding: 5 }}
                            />
                        </View>
                    )}

                    <View style={styles.buttonContainer}>

                        <Pressable style={[styles.button, { backgroundColor: colors.disabledColor }]} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>

                        <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000098",
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.backgroundColor,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    messageText: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
        color: colors.textColor,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.buttonText,
    },
    inputContainer: {
        padding: 16,
        width: '112%',
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
    }
});
