import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryButton, variants } from "../interfaces/ButtonVariant";

interface Props {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    isLoading?: boolean;
    disabled?: boolean;
    iconName?: string;
    variant?: "primary" | "outline";
}

export default function LinkButton({ 
    title, 
    onPress, 
    backgroundColor, 
    isLoading = false, 
    disabled, 
    iconName,
    variant = "primary" }: Props) {

    const buttonVar = variants[variant];
    const buttonStyle = disabled ? buttonVar.disabled : buttonVar.enabled;

    return (
        <Pressable disabled={isLoading || disabled} 
        onPress={onPress} 
        style={[styles.button, {...buttonStyle.button}]}>
            {isLoading ?
                (<ActivityIndicator color={buttonStyle.icon.color} />)
                :
                (
                    <View style={styles.content}>
                        {iconName && (
                            <Icon
                                style={{ marginRight: 12 }}
                                size={20}
                                color={buttonVar == primaryButton ? "#f0f0f0" : "#C61414"}
                                name={iconName}
                            />
                        )}
                        <Text style={[styles.text, buttonStyle.title]}>{title}</Text>
                    </View>
                )
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        borderRadius: 8,
        width: "80%",
        height: 50,
        justifyContent: "center",
    },
    text: {
        fontSize: 22,
        color: "#F0F0F0",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
})