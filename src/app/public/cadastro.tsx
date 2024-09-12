import React from "react";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import Input from "../components/Input";
import LinkButton from "../components/LinkButton";
import { router } from "expo-router";
import BackButton from "../components/BackButton";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConnection";

interface Errors {
    name?: boolean;
    email?: boolean;
    password?: boolean;
}

export default function Cadatro() {
    const [errors, setErrors] = useState<Errors>({ name: false, email: false, password: false})
    const [showErrors, setShowErrors] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleErrors = () => {
        const e: Errors = {}

        if (!name)
            e.name = true

        if (!email)
            e.email = true
        else if (!/\S+@\S+\.\S+/.test(email))
            e.email = true

        if (!password)
            e.password = true
        else if (password !== confirmPassword)
            e.password = true

        setErrors(e)
    }

    useEffect(handleErrors, [name ,email, password, confirmPassword])


    const handleRegister = async () => {
        if (Object.keys(errors).length > 0) {
            setShowErrors(true)
            return
        }
        setShowErrors(false)
        await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            password: password, //TODO: hash password
        })
        .then(() => {
            console.log("Succsessfully registered");
            router.push('../public/login');
        })
        .catch((error) => {
            console.error("Error registring: ", error);
        })
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <BackButton />

                <Text style={styles.title}>Register</Text>

                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={25}
                    style={styles.avoid}>

                    <View style={styles.inputs}>

                        <View style={styles.input}>
                            <Input placeholder="Name" animation err={ showErrors ? errors.name : false } value={name} onChangeText={setName} iconName="account" />
                        </View>

                        <View style={styles.input}>
                            <Input placeholder="Insert email" animation err={ showErrors ? errors.email : false }  value={email} onChangeText={setEmail} iconName="email" />
                        </View>

                        <View style={styles.input}>
                            <Input placeholder="Password" animation err={ showErrors ? errors.password : false}  value={password} onChangeText={setPassword} iconName="lock" />
                        </View>

                        <View style={styles.input}>
                            <Input placeholder="Confirm password" animation err={ showErrors ? errors.password : false } value={confirmPassword} onChangeText={setConfirmPassword} iconName="lock" />
                        </View>

                    </View>

                </KeyboardAvoidingView>

                <View style={styles.btn}>
                    <LinkButton title="Sign up" onPress={ handleRegister } variant="outline" />
                    <Pressable onPress={() => router.push('../public/login')}>
                        <Text style={styles.text}>Already have an account? Log in</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        height: "100%",
        width: "100%",
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: "#f0f0f0",
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
        width: "90%",
        margin: 10,
        flex: 1,
        alignSelf: "center",
    },
    btn: {
        marginTop: 100,
        alignItems: "center",
        width: "100%",
    },
    text: {
        fontSize: 15,
        color: "#f0f0f0",
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        marginBottom: 15,
    }
})