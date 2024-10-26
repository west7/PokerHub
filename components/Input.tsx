import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, KeyboardAvoidingView, StyleSheet, Platform, Text, Animated, Keyboard, Easing, TextInputProps, Pressable, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../theme/theme";

interface IProps extends TextInputProps {
    placeholder: string;
    iconName?: string;
    animation?: boolean;
    duration?: number;
    textColor?: string;
    borderColor?: string;
    err?: boolean;
    iconFunction?: () => void;
    containerStyle?: ViewStyle;
}

export default function Input({
    placeholder,
    iconName,
    animation = false,
    duration = 100,
    textColor = colors.borderColor,
    borderColor = colors.borderColor,
    err = false,
    iconFunction,
    containerStyle,
    ...nativeprops }: IProps) {

    const [iconAnimation, setIconAnimation] = useState(false)
    const [errColor, setErrColor] = useState("#CC0000")
    const [holder, setPlaceHolder] = useState(placeholder)

    const transY = useRef(new Animated.Value(0))
    const borderWidth = useRef(new Animated.Value(2))

    const handleErrors = () => {
        if (err) {
            setPlaceHolder(holder + "*")
        } else {
            setPlaceHolder(holder.split("*")[0])
        }
    }

    const handleFocus = () => {
        if (animation) {
            Animated.timing(transY.current, {
                toValue: -25,
                duration,
                useNativeDriver: true,
            }).start()
            animateBorderWidth(2)
            setIconAnimation(true)
        }
    }

    const handleBlur = () => {
        if (nativeprops.value) return

        Animated.timing(transY.current, {
            toValue: 0,
            duration,
            useNativeDriver: true,
        }).start();
        Keyboard.dismiss();
        animateBorderWidth(2);
        setIconAnimation(false)
    }

    const animateBorderWidth = (toValue: number) => {
        Animated.timing(borderWidth.current, {
            toValue,
            duration,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start();
    }

    const animateBorderColor = borderWidth.current.interpolate({
        inputRange: [1, 2],
        outputRange: [err ? errColor : borderColor, err ? errColor : borderColor],
        extrapolate: "clamp"
    })

    const animateTextColor = borderWidth.current.interpolate({
        inputRange: [1, 2],
        outputRange: [err ? errColor : colors.textColor, err ? errColor : textColor],
        extrapolate: "clamp",
    })

    const animateTextOpacity = borderWidth.current.interpolate({
        inputRange: [1, 2],
        outputRange: [0.8, 1],
        extrapolate: "clamp",
    })

    useEffect(handleErrors, [err]);

    return (
        <Animated.View style={[styles.inputsText, { borderWidth: borderWidth.current, borderColor: animateBorderColor }, containerStyle]}>
            <Animated.View style={[styles.placeholderContainer, { transform: [{ translateY: transY.current }] }]}>
                {animation && (

                    <Animated.Text style={{ color: animateTextColor, backgroundColor: colors.backgroundColor, fontSize: 16, opacity: animateTextOpacity, padding: 3 }}>{holder}</Animated.Text>
                )}
            </Animated.View>
            <TextInput
                {...nativeprops}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={animation ? "" : holder}
                placeholderTextColor={colors.disabledColor}
                style={styles.placeholder}
                underlineColorAndroid="transparent"
            />
            {iconName && (
                <Pressable onPress={iconFunction}>
                    <Icon name={iconName} color={err ? errColor : (iconAnimation ? textColor : textColor)} size={16} style={[styles.icon, { opacity: iconAnimation ? 1 : 1}]} />
                </Pressable>
            )}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    inputsText: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: "100%",
        borderWidth: 2,
        borderRadius: 5,
    },
    icon: {
        marginRight: 10,
        marginLeft: 1,
    },
    placeholder: {
        fontSize: 16,
        width: "90%",
        color: colors.textColor,
        height: "100%",
        zIndex: 1,
        opacity: 1,
    },
    placeholderContainer: {
        position: 'absolute',
        justifyContent: "center",
        marginLeft: 5,
        fontSize: 18,
    }
})