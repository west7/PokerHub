import { colors } from "../theme/theme";

export interface ButtonStyles {
    button:{
        backgroundColor: string;
        borderWidth?: number;
        borderColor?: string;
    };
    title:{
        color: string;
    };
    icon:{
        color: string;
    };
}

export interface ButtonVariant {
    enabled: ButtonStyles;
    disabled: ButtonStyles;    
}

export const primaryButton: ButtonVariant = { 
    enabled:{
        button:{
            backgroundColor: colors.primaryColor,
        },
        title:{
            color: colors.buttonText,
        },
        icon:{
            color: colors.buttonText,  
        }
    },
    disabled:{
        button:{
            backgroundColor: colors.disabledColor,
        },
        title:{
            color: colors.buttonText,
        },
        icon:{
            color: colors.buttonText,  
        }
    },
}

export const outlineButton: ButtonVariant = {
    enabled: {
        button: {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: colors.primaryColor,
        },
        title:{
            color: colors.primaryColor,
        },
        icon:{
            color: colors.primaryColor,  
        }
    },
    disabled:{
        button:{
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: colors.disabledColor,
        },
        title:{
            color: colors.disabledColor,
        },
        icon:{
            color: colors.disabledColor,  
        }
    },
}

export const variants = {
    primary : primaryButton,
    outline : outlineButton,
}
    
