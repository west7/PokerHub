import React from "react";
import { Stack } from "expo-router";
import AuthProvider from "./context/AuthProvider";

export default function Layout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="public/home" options={{
                    title: "Poker App",
                }} />
                <Stack.Screen name="public/login" options={{
                    title: "Login",
                }} />
                <Stack.Screen name="public/cadastro" options={{
                    title: "Cadastro",
                }} />
            </Stack>
        </AuthProvider>
    );
}