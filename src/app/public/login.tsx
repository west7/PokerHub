import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { router } from "expo-router";
import LinkButton from "../components/LinkButton";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface Errors {
    email?: boolean;
    senha?: boolean;
}

export default function Login() {
    const [errors, setErrors] = useState<Errors>({ email: false, senha: false })
    const [showErrors, setShowErrors] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const login = () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true)
            return
        }
        setShowErrors(false)
        router.push("../private/")
    }

    const handleErrors = () => {
        const e: Errors = {}

        if (!email)
            e.email = true
        else if (!/\S+@\S+\.\S+/.test(email))
            e.email = true

        if (!senha)
            e.senha = true


        setErrors(e)
    }


    useEffect(handleErrors, [email, senha])


    return (
        <ScrollView style={{ height: "100%", backgroundColor: "#121212" }}>
            <View style={styles.container}>

                <BackButton />

                <Text style={styles.title}>Poker App</Text>
                <Text style={styles.subtitle}>Manage your own games!</Text>
                
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={50}
                    style={styles.avoid}
                >
                    <View style={styles.inputs}>
                        <Input placeholder="Email" iconName="email" animation err={showErrors ? errors.email : false} value={email} onChangeText={setEmail} />
                    </View>
                    <View style={styles.inputs}>
                        <Input placeholder="Password" iconName="lock" animation
                            err={showErrors ? errors.senha : false} value={senha} onChangeText={setSenha} />
                    </View>
                </KeyboardAvoidingView>

                <View style={styles.btn}>
                    <LinkButton title="Sign in" onPress={login} />
                    <Pressable onPress={() => router.push("../public/cadastro")}>
                        <Text style={styles.text}>Don't have an account? Register</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        alignSelf: "center",
        marginTop: 100,
        marginBottom: 10,
        color: "#f0f0f0",
        borderBottomWidth: 2,
        borderBottomColor: "#C61414",
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center",
        marginBottom: 40,
        color: "#f0f0f0",
    },
    avoid: {
        width: "90%",
        flex: 1,
        margin: 10,
    },
    btn: {
        marginTop: 100,
        width: "100%",
        alignItems: "center"
    },
    inputs: {
        margin: 10,
    },
    text: {
        fontSize: 15,
        color: "#f0f0f0",
        marginTop: 5,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0"
    },
})