import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Theme, lightTheme, darkTheme } from "../theme/theme";
import { StyleProp } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeProviderProps {
    children: React.ReactNode;
}

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

const useThemedStyles = <T extends StyleProp<any>>(getStyles: (theme: Theme) => T): T => {
    const { theme } = useTheme();
    return getStyles(theme);
};

export default useThemedStyles;

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(darkTheme);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme) {
                    setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
                }
            }
            catch (error) {
                console.error('Error loading theme:', error);
            }
        };

        loadTheme();
    }, []);


    const toggleTheme = async () => {
        const newTheme = theme === darkTheme ? lightTheme : darkTheme;
        setTheme(newTheme);

        try {
            await AsyncStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
        }
        catch (error) {
            console.error('Error saving theme:', error);
        }
    };

    const memoizedValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={memoizedValue}>
            {children}
        </ThemeContext.Provider>
    );
}

