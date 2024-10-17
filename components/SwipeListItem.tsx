import React from "react";
import { Pressable, View, Text, StyleSheet, ViewStyle } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { colors } from "../theme/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface SwipeListItemProps {
    onEdit: () => void;
    onDelete: () => void;
    children: React.ReactNode;
    containerStyle?: any;
}

export default function SwipeListItem({ onEdit, onDelete, children, containerStyle }: SwipeListItemProps) {

    const renderRightActions = () => (
        <View style={[containerStyle, styles.container]}>
            <Pressable
                style={({ pressed }) => [
                    styles.actionButton,
                    pressed && styles.actionButtonPressed,
                    { backgroundColor: colors.disabledColor }
                ]}
                onPress={onEdit}
            >
                <Icon name="pencil" size={20} color={colors.buttonText} />
            </Pressable>


            <Pressable
                style={({ pressed }) => [
                    styles.actionButton,
                    pressed && styles.actionButtonPressed,
                    { backgroundColor: "#cc0000" }
                ]}
                onPress={onDelete}
            >
                <Icon name="delete" size={20} color={colors.buttonText} />
            </Pressable>
        </View>
    );

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            overshootRight={false}
        >
            {children}
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '100%',
    },
    actionButtonPressed: {
        opacity: 0.5,
    },
    actionText: {
        color: colors.textColor,
        fontWeight: 'bold',
    },
    divider: {
        width: 1,  // Largura da linha
        backgroundColor: colors.backgroundLightColor,
    },
});
