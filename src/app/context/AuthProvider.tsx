import { onAuthStateChanged, User as FirebaseUser} from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConnection";
import { doc, getDoc } from "firebase/firestore";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;
interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    name: string;
    email: string;
    uid: string;
}

interface UserContextProps {
    signed: boolean;
    user: User | null;
    loading: boolean;
}

export const AuthContext = createContext<UserContextProps | undefined>(undefined);

export default function AuthProvider({ children } : AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); 

    const getUser = () => {
        onAuthStateChanged(auth, async (authUser: FirebaseUser | null) => {
            if (authUser) {
                const userDoc = await getDoc(doc(db, 'users', authUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data() as User;
                    setUser(userData);
                } 
                else {
                    setUser(null)
                }
            }
            setLoading(false)
        })
    }

    useEffect(getUser, [auth, db]);

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}