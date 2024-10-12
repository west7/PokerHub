import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as FirebaseSignOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

export async function signIn(email: string, password: string): Promise<string | void> {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (e) {
        throw e;
    }
}

export async function signUp(email: string, password: string, name: string) {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
        });

    } catch (e) {
        throw e;
    }
}

export async function signOut() {
    try {
        await FirebaseSignOut(auth);
    }
    catch (err) {
        console.log(err);
    }
}