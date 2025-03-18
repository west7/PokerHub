import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Theme } from "../theme/theme";
import useThemedStyles, { useTheme } from "../context/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder: string;
}

export default function SearchBar({ searchQuery, setSearchQuery, placeholder }: SearchBarProps) {
    const styles = useThemedStyles(getStyles);
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <Icon
                name="account-search"
                size={16}
                color={ theme.textColor}
                style={styles.icon}
            />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 8,
        backgroundColor: theme.backgroundLightColor,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',   
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: theme.textColor,
    },
})