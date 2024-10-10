import React, { createContext, useContext, useState } from "react";
import { colors, Colors } from "../interfaces/Colors";

interface ThemeProviderProps {
    children: React.ReactNode;
}

interface ThemeContextProps {
    theme: Colors;
    setTheme: React.Dispatch<React.SetStateAction<Colors>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState(colors);

    /* const toggleTheme = () => {
        setTheme((prev) => prev === colors ? lightColors : theme);
    } */

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context; // Agora o hook já retorna o contexto de forma segura
};