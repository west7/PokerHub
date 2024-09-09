import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    placeholder: string;
    onPress: () => void;
    iconName?: string;
    imageSrc?: string;
}

//trending-up

export default function OptionButton({ placeholder, onPress ,iconName, imageSrc }: Props) {


    return (
        <Pressable style={styles.container} onPress={onPress}>
            {iconName && (
                <Icon name={iconName}
                color={"#f0f0f0"}
                size={40}
                style={styles.icon}
                />
            )}
            <Text style={styles.text}>{placeholder}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: "center",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#f0f0f0",
        padding: 10,
    },
    icon:{

    },
    text:{
        color: "#f0f0f0",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
})