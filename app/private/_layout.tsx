import React, { ReactNode, useContext, useState } from "react";
import { Redirect, router, Stack } from "expo-router";
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import Home from './index'
import { colors } from "../../interfaces/Colors";
import Players from "./players";
import History from "./history";
import Statistics from "./statistics";
import { AuthContext } from "../../context/AuthProvider";
import LoadingScreen from "../../components/LoadingScreen";
import Icon from 'react-native-vector-icons/Entypo';
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import GameStack from "./gamesettings/_layout";
import { signOut } from "../../services/user.services";


const Drawer = createDrawerNavigator();


export default function InsideLayout() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("User not found");
    }

    const { signed, user, loading, logout } = context;

    const handleLogout = async () => {
        signOut()
        .then(() => {
            logout();
        })
    }

    if (loading) {
        return <LoadingScreen />
    }

    if (!signed || !user) {
        return <Redirect href="" />
    }

    const CustomDrawer = (props: DrawerContentComponentProps) => {
        return (
            <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>

                <TouchableOpacity style={{ backgroundColor: colors.baseColor, padding: 20 }} activeOpacity={0.5}>
                    <Text style={{ color: colors.textColor, fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    <DrawerItemList {...props} />
                </View>

                <DrawerItem
                    style={{ backgroundColor: colors.baseColor, borderTopWidth: 2, borderTopColor: colors.backgroundLightColor, marginBottom: 12 }}
                    label="Sign Out"
                    labelStyle={{ color: colors.textColor }}
                    onPress={handleLogout}
                    icon={() => (
                        <Icon
                            name="log-out"
                            color={colors.textColor}
                            size={18}
                        />
                    )}
                />
                
            </DrawerContentScrollView>
        );
    }

    return (

        <>
        <StatusBar barStyle="default" />
            <Drawer.Navigator screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.backgroundDarkColor,
                    borderBottomWidth: 0,
                },
                headerTintColor: colors.primaryColor,
                headerTitle: "",
                drawerStyle: {
                    backgroundColor: colors.baseColor,
                    paddingTop: 20,
                },
                drawerLabelStyle: {
                    marginLeft: -15,
                },
                drawerActiveBackgroundColor: colors.primaryColor,
                drawerActiveTintColor: colors.textColor,
                drawerInactiveTintColor: colors.textColor,
                drawerInactiveBackgroundColor: colors.backgroundLightColor,
            }}
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen
                    name="Home"
                    component={Home}
                    options={{
                        drawerIcon: () => (
                            <Icon2
                                name="home"
                                color={colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Game Settings"
                    component={GameStack}
                    options={{
                        drawerIcon: () => (
                            <Icon2
                                name="cog"
                                color={colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Players"
                    component={Players}
                    options={{
                        drawerIcon: () => (
                            <Icon2
                                name="account-group"
                                color={colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="History"
                    component={History}
                    options={{
                        drawerIcon: () => (
                            <Icon2
                                name="history"
                                color={colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Statistics"
                    component={Statistics}
                    options={{
                        drawerIcon: () => (
                            <Icon2
                                name="trending-up"
                                color={colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </>
    );
}