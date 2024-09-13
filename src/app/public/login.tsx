import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { router } from "expo-router";
import LinkButton from "../components/LinkButton";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
interface Errors {
    email?: boolean;
    senha?: boolean;
}

export default function Login() {
    const [errors, setErrors] = useState<Errors>({ email: false, senha: false })
    const [showErrors, setShowErrors] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState(false)

    /* const login = () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true)
            return
        }
        setShowErrors(false)
        router.push("../private/")
    } */

    const signIn = async () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true)
            return
        }
        setShowErrors(false)
        setLoading(true)
        signInWithEmailAndPassword(auth, email, senha)
            .then((response) => {
                console.log(response);
                router.push("../private/");
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

        if (!senha)
            e.senha = true


        setErrors(e)
    }


    useEffect(handleErrors, [email, senha])


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
                            placeholder="Password"
                            iconName="lock"
                            animation
                            err={showErrors ? errors.senha : false}
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                        />
                    </View>
                </KeyboardAvoidingView>

                <View style={styles.btn}>
                    <LinkButton
                        title="Sign in"
                        onPress={signIn}
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
        backgroundColor: "#121212",
    },
    title: {
        fontWeight: "bold",
        fontSize: 40,
        alignSelf: "center",
        marginTop: 100,
        marginBottom: 10,
        color: "#f0f0f0",
        textDecorationLine: "underline",
        textDecorationColor: "#C61414",
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center",
        marginBottom: 40,
        color: "#f0f0f0",
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
        color: "#f0f0f0",
        marginTop: 5,
        marginBottom: 15,
        textDecorationLine: "underline",
    },
})