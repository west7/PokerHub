import React from "react";
import { ActivityIndicator, ButtonProps, Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { variants } from "../interfaces/ButtonVariant";
import { Theme } from "../theme/theme";
import useThemedStyles from "../context/ThemeProvider";

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

    const sizeStyles = size === "large" ? stylesLarge : stylesSmall;
    const styles = useThemedStyles(baseStyles);

    return (
        <Pressable disabled={isLoading || disabled}
            {...nativeProps}
            style={[
                styles.button,
                sizeStyles.button,
                { ...buttonStyle.button },
                backgroundColor ? { backgroundColor } : {},
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
                            sizeStyles.text,
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

const baseStyles = (theme: Theme) => StyleSheet.create({
    button: {
        margin: 10,
        justifyContent: "center",
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 2,
    }, 
    text: {
        color: theme.textColor,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})

const stylesLarge = StyleSheet.create({
    button: {
        borderRadius: 8,
        height: 50,
        width: "80%",
    },
    text: {
        fontSize: 22,
    },
})

const stylesSmall = StyleSheet.create({
    button: {
        borderRadius: 5,
        height: 30,
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
    },
})