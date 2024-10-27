import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import Input from "./Input";
import { Theme } from "../theme/theme";
import useThemedStyles, { useTheme } from "../context/ThemeProvider";

interface InputModelProps {
    value: string;
    onChangeText: (text: string) => void;
    iconName?: string;
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
    
    const styles = useThemedStyles(getStyles);
    const { theme } = useTheme();

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
                                iconName={input.iconName}
                            />
                        </View>
                    )}

                    <View style={styles.buttonContainer}>

                        <Pressable style={[styles.button, { backgroundColor: theme.disabledColor }]} onPress={onCancel}>
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

const getStyles = (theme: Theme) => StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000098",
    },
    modalView: {
        margin: 30,
        backgroundColor: theme.backgroundColor,
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
        color: theme.textColor,
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
        color: theme.buttonText,
    },
    inputContainer: {
        padding: 16,
        width: '112%',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.textColor,
        zIndex: 1,
        opacity: 1,
        borderWidth: 2,
        borderRadius: 7,
        borderColor: theme.textColor,
    }
});
