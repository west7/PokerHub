import React from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { colors } from "../interfaces/Colors";

interface ConfirmationModalProps {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({
    visible,
    message,
    onConfirm,
    onCancel }: ConfirmationModalProps) {

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
        fontSize: 16,
        marginBottom: 20,
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
    }
});
