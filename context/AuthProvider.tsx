import { onAuthStateChanged, User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as FirebaseSignOut } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../interfaces/user.interface";
import { FirebaseErrorCustomMessage } from "../helpers/firebaseerror.helper";
import Toast from "react-native-toast-message";
import { FirebaseError } from "firebase/app";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;
interface AuthProviderProps {
    children: ReactNode;
}

interface UserContextProps {
    user: User | null;
    isSignedIn: boolean;
    isLoading: boolean;
    initialLoading: boolean;
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string, name: string) => void;
    signOut: () => void;
}

export const AuthContext = createContext<UserContextProps | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext)
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const isSignedIn = !!user;
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoading, setIniitialLoading] = useState(true);

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, async (authUser: FirebaseUser | null) => {
            if (authUser) {
                const userDoc = await getDoc(doc(db, 'users', authUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data() as User;
                    setUser({ ...userData, uid: authUser.uid });
                }
                else {
                    setUser(null);
                }
            }
            setIniitialLoading(false);
        });

        return subscribe;
    }, []);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const authUser = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, 'users', authUser.user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                setUser({ ...userData, uid: authUser.user.uid });
            }
        } catch (error) {
            const message = FirebaseErrorCustomMessage(error as FirebaseError);
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;

            // Adiciona o usuário ao Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
            });

            // Atualiza o estado do usuário
            setUser({
                uid: user.uid,
                name,
                email,
            });

            Toast.show({
                type: "success",
                text1: "Sucesso!",
                text2: "Usuário criado com sucesso!",
            });

        } catch (error) {
            const message = FirebaseErrorCustomMessage(error as FirebaseError);
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await FirebaseSignOut(auth);
            setUser(null);
        } catch (error) {
            const message = FirebaseErrorCustomMessage(error as FirebaseError);
            Toast.show({
                type: "error",
                text1: "Erro!",
                text2: message,
            });
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <AuthContext.Provider
            value={{
                user,
                isSignedIn,
                isLoading,
                initialLoading,
                signOut,
                signIn,
                signUp,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

