const primayColorRed = "#C61414"
const primaryColorGreen = "#0E4916"
const whiteColor = "#f0f0f0"
const disabledColor = "#5a5a5a"

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

export const primaryButton: ButtonVariant ={
    enabled:{
        button:{
            backgroundColor: primayColorRed,
        },
        title:{
            color: whiteColor,
        },
        icon:{
            color: whiteColor,  
        }
    },
    disabled:{
        button:{
            backgroundColor: disabledColor,
        },
        title:{
            color: whiteColor,
        },
        icon:{
            color: whiteColor,  
        }
    },
}

export const outlineButton: ButtonVariant = {
    enabled: {
        button: {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: primayColorRed,
        },
        title:{
            color: primayColorRed,
        },
        icon:{
            color: primayColorRed,  
        }
    },
    disabled:{
        button:{
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: primayColorRed,
        },
        title:{
            color: disabledColor,
        },
        icon:{
            color: disabledColor,  
        }
    },
}

export const variants ={
    primary : primaryButton,
    outline : outlineButton,
}
    
