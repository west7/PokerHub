import React from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as FirebaseSignOut} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

export async function signIn(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (e) {
        const error = e as FirebaseError;
        alert(`Error signing in: ${error.message}`);
    }
}

export async function signUp(email: string, password: string, name: string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (response) => {
            const user = response.user;
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
            })
                .catch((e: any) => {
                    const err = e as FirebaseError
                    alert(err.message);
                })
        })
        .catch((e: any) => {
            const err = e as FirebaseError
            alert(err.message);
        })
}

export async function signOut() {
    try {
        await FirebaseSignOut(auth);
    }
    catch (err) {
        signOut
        console.log(err);
    }
}