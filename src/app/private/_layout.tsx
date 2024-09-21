import React from "react";
import { Stack } from "expo-router";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Index from './index'
import { FIREBASE_AUTH } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import { colors } from "../interfaces/Colors";

const Drawer = createDrawerNavigator();
const auth = FIREBASE_AUTH;

export default function Layout() {

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Deslogado com sucesso");
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.backgroundColor,
                },
                headerTintColor: colors.primaryColor,
                headerTitle: "",
                drawerStyle: {
                    backgroundColor: colors.backgroundColor,
                },
                drawerActiveBackgroundColor: colors.primaryColor,
                drawerActiveTintColor: colors.textColor,
                drawerInactiveTintColor: colors.textColor,
            }}>
                <Drawer.Screen
                    name="Home"
                    component={Index}
                />
                <Drawer.Screen
                    name="Logout"
                    component={()=>null}
                    options={{ drawerLabel: 'Logout' }}
                    listeners={{
                        drawerItemPress: () => handleLogout(),
                    }} 
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}