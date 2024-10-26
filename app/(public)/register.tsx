import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import Input from "../../components/Input";
import LinkButton from "../../components/LinkButton";
import { router, } from "expo-router";
import BackButton from "../../components/BackButton";
import { setDoc, doc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { colors } from "../../theme/theme";
import Toast from "react-native-toast-message";
import { FirebaseErrorCustomMessage } from "../../helpers/firebaseerror.helper";
import { useAuth } from "../../context/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";

interface Errors {
    name?: boolean;
    email?: boolean;
    password?: boolean;
}

export default function Register() {
    const [errors, setErrors] = useState<Errors>({ name: false, email: false, password: false })
    const [showErrors, setShowErrors] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errMessage, setErrMessage] = useState<string | null>(null)
    const [showToast, setShowToast] = useState(false)

    const { signUp, isLoading } = useAuth();

    const handleErrors = () => {
        const e: Errors = {}

        if (!name) {
            e.name = true
            setErrMessage("Nome é obrigatório")
        }

        if (!email) {
            e.email = true
            setErrMessage("Email é obrigatório")
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            e.email = true
            setErrMessage("Email inválido")
        }

        if (!password) {
            e.password = true
            setErrMessage("Senha é obrigatória")
        }
        else if (password !== confirmPassword) {
            e.password = true
            setErrMessage("Senhas são diferentes")
        }

        setErrors(e)
    }

    useEffect(handleErrors, [name, email, password, confirmPassword])

    useEffect(() => {
        if (errMessage && showToast) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: errMessage,
            });
        }
    }, [errMessage, showToast]);


    const handleSignUp = () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true)
            setShowToast(true)
            return
        }
        setShowErrors(false)

        signUp(email, password, name)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <BackButton />

                <Text style={styles.title}>Register</Text>

                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.avoid}>

                    <View style={styles.inputs}>

                        <View style={styles.input}>
                            <Input
                                placeholder="Name"
                                inputMode="text"
                                animation
                                err={showErrors ? errors.name : false}
                                value={name}
                                onChangeText={setName}
                                iconName="account"
                            />
                        </View>

                        <View style={styles.input}>
                            <Input
                                placeholder="Insert email"
                                inputMode="email"
                                autoComplete="email"
                                autoCapitalize="none"
                                animation
                                err={showErrors ? errors.email : false}
                                value={email}
                                onChangeText={setEmail}
                                iconName="email"
                            />
                        </View>

                        <View style={styles.input}>
                            <Input
                                placeholder="Password"
                                animation
                                err={showErrors ? errors.password : false}
                                value={password}
                                onChangeText={setPassword}
                                iconName={showPassword ? "lock-open-variant" : "lock"} iconFunction={handleShowPassword}
                                secureTextEntry={!showPassword}
                            />
                        </View>

                        <View style={styles.input}>
                            <Input
                                placeholder="Confirm password"
                                animation
                                err={showErrors ? errors.password : false}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                iconName={showConfirmPassword ? "lock-open-variant" : "lock"}
                                iconFunction={handleShowConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                            />
                        </View>

                    </View>

                </KeyboardAvoidingView>

                <View style={styles.btn}>
                    <LinkButton
                        title="Sign up"
                        onPress={handleSignUp}
                        variant="outline"
                        isLoading={isLoading}
                    />
                    <Pressable onPress={() => router.push('../(public)/login')}>
                        <Text style={styles.text}>Already have an account? Log in</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.textColor,
        marginLeft: 28,
        marginTop: 20,
    },
    inputs: {
        marginTop: 20,
    },
    input: {
        margin: 10,
    },
    avoid: {
        flex: 1,
    },
    btn: {
        marginTop: 100,
        alignItems: "center",
        width: "100%",
    },
    text: {
        fontSize: 15,
        color: colors.textColor,
        marginTop: 5,
        marginBottom: 15,
        textDecorationLine: "underline",
    }
})