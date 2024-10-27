import React from "react";
import { Pressable, View, Text, StyleSheet, ViewStyle } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Theme } from "../theme/theme";
import useThemedStyles, { useTheme } from "../context/ThemeProvider";

interface SwipeListItemProps {
    onEdit: () => void;
    onDelete: () => void;
    children: React.ReactNode;
    containerStyle?: any;
}

export default function SwipeListItem({ onEdit, onDelete, children, containerStyle }: SwipeListItemProps) {

    const styles = useThemedStyles(getStyles);
    const { theme } = useTheme();

    const renderRightActions = () => (
        <View style={[containerStyle, styles.container]}>
            <Pressable
                style={({ pressed }) => [
                    styles.actionButton,
                    pressed && styles.actionButtonPressed,
                    { backgroundColor: theme.disabledColor }
                ]}
                onPress={onEdit}
            >
                <Icon name="pencil" size={18} color={theme.buttonText} />
            </Pressable>


            <Pressable
                style={({ pressed }) => [
                    styles.actionButton,
                    pressed && styles.actionButtonPressed,
                    { backgroundColor: theme.primaryColor }
                ]}
                onPress={onDelete}
            >
                <Icon name="delete" size={18} color={theme.buttonText} />
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

const getStyles = (theme: Theme) => StyleSheet.create({
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
        color: theme.textColor,
        fontWeight: 'bold',
    },
    divider: {
        width: 1,
        backgroundColor: theme.backgroundLightColor,
    },
});
