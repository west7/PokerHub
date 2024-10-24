import { Redirect, Slot } from "expo-router";
import React from "react";
import {  useAuth } from "../../context/AuthProvider";
import LoadingScreen from "../../components/LoadingScreen";

export default function PrivateLayout() {
    const { isLoading, isSignedIn } = useAuth();

    if (isLoading) {
        return <LoadingScreen/>
    }

    if (!isSignedIn) {
        return <Redirect href="(public)/login" />
    }

    return <Slot />
}