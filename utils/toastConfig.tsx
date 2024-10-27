import React from "react";
import { BaseToast, BaseToastProps, ErrorToast } from "react-native-toast-message";
import { darkTheme, Theme } from "../theme/theme";

function createToastConfig(theme: Theme) {
    return {
        success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: '#19ff19', backgroundColor: theme.backgroundLightColor }}
                text1Style={{
                    fontSize: 16,
                    color: theme.textColor
                }}
                text2Style={{
                    fontSize: 14
                }}
            />
        ),
        error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
            <ErrorToast
                {...props}
                style={{ borderLeftColor: '#FA2D1E', backgroundColor: theme.backgroundLightColor }}
                text1Style={{
                    fontSize: 16,
                    color: theme.textColor
                }}
                text2Style={{
                    fontSize: 14
                }}
            />
        )
    }
}

const toastConfig = createToastConfig(darkTheme);

export default toastConfig;