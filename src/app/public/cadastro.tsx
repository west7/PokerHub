import React from "react";
import {useState} from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import Input from "../components/Input";
import LinkButton from "../components/LinkButton";
import { router } from "expo-router";
import BackButton from "../components/BackButton";


export default function Cadatro() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


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
                            <Input placeholder="Name" animation value={name} onChangeText={setName} iconName="account" />
                        </View>

                        <View style={styles.input}>
                            <Input placeholder="Insert email" animation value={email} onChangeText={setEmail} iconName="email"/>
                        </View>

                        <View style={styles.input}>
                            <Input placeholder="Password" animation value={password} onChangeText={setPassword} iconName="lock"/>
                        </View>

                        <View style={styles.input}>
                            <Input placeholder="Confirm password" animation value={confirmPassword} onChangeText={setConfirmPassword} iconName="lock"/>
                        </View>

                    </View>

                </KeyboardAvoidingView>

                <View style={styles.btn}>
                    <LinkButton title="Sign up" onPress={() => router.push('../public/login')} variant="outline"/>
                    <Pressable onPress={() => router.push('../public/login') }>
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
        marginTop: 60,
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