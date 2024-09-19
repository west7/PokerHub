import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { router } from "expo-router";
import LinkButton from "../components/LinkButton";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import { FIREBASE_AUTH } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import {colors} from "../interfaces/Colors"
interface Errors {
    email?: boolean;
    senha?: boolean;
}

const auth = FIREBASE_AUTH;

export default function Login() {
    const [errors, setErrors] = useState<Errors>({ email: false, senha: false })
    const [showErrors, setShowErrors] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    //TODO: Implementar o Loading 
    //TODO: Implementar o erro de login
    //TODO: Implementar recuperação de senha
    //TODO: Implementar Notificações internas no app

    const signIn = () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true)
            return
        }
        setShowErrors(false)
        setLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                //console.log(response);
                router.push("../private/"); //replace
            })
            .catch((e) => {
                alert(e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleErrors = () => {
        const e: Errors = {}

        if (!email)
            e.email = true
        else if (!/\S+@\S+\.\S+/.test(email))
            e.email = true

        if (!password)
            e.senha = true

        setErrors(e)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(handleErrors, [email, password])


    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <ScrollView style={{ height: '100%', width: '100%' }}>

                <Text style={styles.title}>Poker App</Text>
                <Text style={styles.subtitle}>Manage your own games!</Text>

                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.avoid}
                >
                    <View style={styles.inputs}>
                        <Input
                            keyboardType="email-address"
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
                            keyboardType="visible-password"
                            placeholder="Password"
                            iconName= {showPassword ? "lock-open-variant" : "lock"}
                            animation
                            err={showErrors ? errors.senha : false}
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
                        onPress={signIn}
                        isLoading={loading}
                    />

                    <Pressable onPress={() => router.push("../public/cadastro")}>
                        <Text style={styles.text}>Don't have an account? Register</Text>
                    </Pressable>
                
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        backgroundColor: colors.backgroundColor,
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        alignSelf: "center",
        marginTop: 100,
        marginBottom: 10,
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