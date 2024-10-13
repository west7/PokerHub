import { onAuthStateChanged, User as FirebaseUser} from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../interfaces/user.interface";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;
interface AuthProviderProps {
    children: ReactNode;
}

interface UserContextProps {
    signed: boolean;
    user: User | null;
    loading: boolean;
    logout: () => void;
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
                    setUser({...userData, uid: authUser.uid});
                } 
                else {
                    setUser(null)
                }
            }
            setLoading(false)
        })
    }

    const logout = () => {
        setUser(null);
    }

    useEffect(getUser, [auth, db]);

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}