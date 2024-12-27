import { useTheme } from "../context/ThemeProvider";
import { darkTheme, Theme } from "../theme/theme";

const theme = darkTheme; 
export interface ButtonStyles {
    button: {
        backgroundColor: string;
        borderWidth?: number;
        borderColor?: string;
    };
    title: {
        color: string;
    };
    icon: {
        color: string;
    };
}

export interface ButtonVariant {
    enabled: ButtonStyles;
    disabled: ButtonStyles;
}

export const primaryButton: ButtonVariant = {
    enabled: {
        button: {
            backgroundColor: theme.primaryColor,
        },
        title: {
            color: theme.buttonText,
        },
        icon: {
            color: theme.buttonText,
        }
    },
    disabled: {
        button: {
            backgroundColor: theme.disabledColor,
        },
        title: {
            color: theme.buttonText,
        },
        icon: {
            color: theme.buttonText,
        }
    },
}

export const outlineButton: ButtonVariant = {
    enabled: {
        button: {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: theme.primaryColor,
        },
        title: {
            color: theme.primaryColor,
        },
        icon: {
            color: theme.primaryColor,
        }
    },
    disabled: {
        button: {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: theme.disabledColor,
        },
        title: {
            color: theme.disabledColor,
        },
        icon: {
            color: theme.disabledColor,
        }
    },
}

export const variants = {
    primary: primaryButton,
    outline: outlineButton,
}

