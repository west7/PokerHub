export interface Theme {
    baseColor: string;
    backgroundColor: string;
    backgroundLightColor: string;
    backgroundDarkColor: string;
    textColor: string;
    primaryColor: string;
    primaryLightColor: string;
    primaryDarkColor: string;
    disabledColor: string;
    buttonText: string;
    borderColor: string;
    errorColor: string;
    successColor: string;
    secondaryTextColor: string;
}

export const lightTheme: Theme = {
    baseColor: "#fff",
    backgroundColor: "#f5f5f5",
    backgroundLightColor: "#e0e0e0",
    backgroundDarkColor: '#fff',
    textColor: "#1f1f1f",
    borderColor: "#808080",
    primaryColor: "#FA2D1E",
    primaryLightColor: "#C61414",
    primaryDarkColor: "#A90800",
    disabledColor: "#5a5a5a",
    buttonText: "#f0f0f0",
    errorColor: "#CC0000",
    successColor: "#19ff19",
    secondaryTextColor: "#202020",
}

export const darkTheme: Theme = {
    baseColor: "#000",
    backgroundColor: "#121212",
    backgroundLightColor: "#1c1c1c",
    backgroundDarkColor: '#0f0f0f',
    borderColor: "#c0c0c0",
    textColor: "#f0f0f0",
    primaryColor: "#FA2D1E",
    primaryLightColor: "#C61414",
    primaryDarkColor: "#A90800",
    disabledColor: "#5a5a5a",
    buttonText: "#f0f0f0",
    errorColor: "#CC0000",
    successColor: "#19ff19",
    secondaryTextColor: "#808080",
}

