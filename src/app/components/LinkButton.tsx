import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryButton, variants } from "../interfaces/ButtonVariant";

interface Props {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    isLoading?: boolean;
    disabled?: boolean;
    iconName?: string;
    variant?: "primary" | "outline";
}

export default function LinkButton({
    title,
    onPress,
    backgroundColor,
    textColor,
    isLoading = false,
    disabled,
    iconName,
    variant = "primary" }: Props) {

    const buttonVar = variants[variant];
    const buttonStyle = disabled ? buttonVar.disabled : buttonVar.enabled;

    return (
        <Pressable disabled={isLoading || disabled}
            onPress={onPress}
            style={[
                styles.button,
                { ...buttonStyle.button },
                backgroundColor ? { backgroundColor } : {}
            ]}>
            {isLoading ?
                (<ActivityIndicator color={textColor ? textColor : buttonStyle.icon.color} />)
                :
                (
                    <View style={styles.content}>
                        {iconName && (
                            <Icon
                                style={{ marginRight: 12 }}
                                size={20}
                                color={textColor ? textColor : buttonStyle.icon.color}
                                name={iconName}
                            />
                        )}
                        <Text style={[
                            styles.text,
                            buttonStyle.title,
                            textColor ? { color: textColor } : { color: buttonStyle.title.color }
                        ]}
                        >
                            {title}
                        </Text>
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