import React from "react";
import { ActivityIndicator, ButtonProps, Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryButton, variants } from "../interfaces/ButtonVariant";
import { colors } from "../theme/theme";

interface Props extends ButtonProps {
    title: string;
    backgroundColor?: string;
    textColor?: string;
    isLoading?: boolean;
    disabled?: boolean;
    iconName?: string;
    variant?: "primary" | "outline";
    size?: "small" | "medium" | "large";
    textStyles?: TextStyle;
}

export default function LinkButton({
    title,
    backgroundColor,
    textColor,
    isLoading = false,
    disabled,
    iconName,
    variant = "primary",
    size = "large",
    textStyles,
    ...nativeProps }: Props) {

    const buttonVar = variants[variant];
    const buttonStyle = disabled ? buttonVar.disabled : buttonVar.enabled;
    const styles = size === "large" ? stylesLarge : stylesSmall;

    return (
        <Pressable disabled={isLoading || disabled}
            {...nativeProps}
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
                                style={{ marginRight: 10 }}
                                size={20}
                                color={textColor ? textColor : buttonStyle.icon.color}
                                name={iconName}
                            />
                        )}
                        <Text style={[
                            styles.text,
                            buttonStyle.title,
                            textColor ? { color: textColor } : { color: buttonStyle.title.color },
                            textStyles
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

const stylesLarge = StyleSheet.create({
    button: {
        margin: 10,
        borderRadius: 8,
        width: "80%",
        height: 50,
        justifyContent: "center",
    },
    text: {
        fontSize: 22,
        color: colors.textColor,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})

const stylesSmall = StyleSheet.create({
    button: {
        margin: 10,
        borderRadius: 5,
        height: 30,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 16,
        color: colors.textColor,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})