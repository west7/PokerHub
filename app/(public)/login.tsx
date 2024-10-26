import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { router } from "expo-router";
import LinkButton from "../../components/LinkButton";
import Input from "../../components/Input";
import { colors } from "../../theme/theme"
import { useAuth } from "../../context/AuthProvider";

interface Errors {
    email?: boolean;
    password?: boolean;
}

export default function Login() {
    const [errors, setErrors] = useState<Errors>({ email: false, password: false })
    const [showErrors, setShowErrors] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    //TODO: Implementar recuperação de senha

    const { signIn, isLoading } = useAuth()

    const handleLogin = () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);

        signIn(email, password)
    };

    const handleErrors = () => {
        const e: Errors = {}

        if (!email)
            e.email = true
        else if (!/\S+@\S+\.\S+/.test(email))
            e.email = true

        if (!password)
            e.password = true

        setErrors(e)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(handleErrors, [email, password])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.contentContainer}>

                <Text style={styles.title}>Poker App</Text>
                <Text style={styles.subtitle}>Manage your own games!</Text>

                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={styles.inputs}>
                        <Input
                            clearButtonMode="while-editing"
                            inputMode="email"
                            autoComplete="email"
                            autoCapitalize="none"
                            placeholder="Email"
                            iconName="email"
                            animation
                            err={showErrors ? errors.email : false}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputs}>
                        <Input
                            inputMode="text"
                            placeholder="Password"
                            iconName={showPassword ? "lock-open-variant" : "lock"}
                            animation
                            err={showErrors ? errors.password : false}
                            value={password}
                            onChangeText={setPassword}
                            iconFunction={handleShowPassword}
                            secureTextEntry={!showPassword}
                        />
                    </View>
                </KeyboardAvoidingView>

                <View style={styles.btn}>
                    <LinkButton
                        title="Sign in"
                        onPress={handleLogin}
                        isLoading={isLoading}
                    />

                    <Pressable onPress={() => router.push("../(public)/register")}>
                        <Text style={styles.text}>Don't have an account? Register</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.backgroundColor,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        alignSelf: "center",
        marginBottom: 10,
        marginTop: 150,
        color: colors.textColor,
        textDecorationLine: "underline",
        textDecorationColor: colors.primaryColor,

    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center",
        marginBottom: 40,
        color: colors.textColor,
    },
    avoid: {
        flex: 1,
    },
    btn: {
        alignItems: "center",
        bottom: 0,
        marginTop: 40,
        flex: 1,
    },
    inputs: {
        margin: 10,
    },
    text: {
        fontSize: 15,
        color: colors.textColor,
        marginTop: 5,
        marginBottom: 15,
        textDecorationLine: "underline",
    },
})