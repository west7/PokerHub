import React from "react";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useAuth } from "../../../context/AuthProvider";
import LoadingScreen from "../../../components/LoadingScreen";
import Icon from 'react-native-vector-icons/Entypo';
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Drawer } from 'expo-router/drawer'
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import { useTheme } from "../../../context/ThemeProvider";

export default function DrawerLayout() {

    const { user, isLoading, signOut } = useAuth();
    const { theme } = useTheme();

    const handleLogout = async () => {
        signOut();
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    const CustomDrawer = (props: DrawerContentComponentProps) => {
        return (
            <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>

                <TouchableOpacity style={{ backgroundColor: theme.baseColor, padding: 20 }} activeOpacity={0.5}>
                    <Text style={{ color: theme.textColor, fontSize: 20, fontWeight: "bold" }}>{user?.name}</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    <DrawerItemList {...props} />
                </View>

                <ThemeSwitcher />

                <DrawerItem
                    style={{ backgroundColor: theme.baseColor, borderTopWidth: 2, borderTopColor: theme.backgroundLightColor, marginBottom: 12 }}
                    label="Sign Out"
                    labelStyle={{ color: theme.textColor }}
                    onPress={handleLogout}
                    icon={() => (
                        <Icon
                            name="log-out"
                            color={theme.textColor}
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
            <Drawer
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: theme.backgroundDarkColor,
                        shadowColor: "#000",
                        elevation: 5,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 5,
                        borderBottomWidth: 0,
                    },
                    headerTintColor: theme.primaryColor,
                    headerTitle: "",
                    drawerStyle: {
                        backgroundColor: theme.baseColor,
                        paddingTop: 20,
                    },
                    drawerActiveBackgroundColor: theme.primaryColor,
                    drawerActiveTintColor: theme.buttonText,
                    drawerInactiveTintColor: theme.textColor,
                    drawerInactiveBackgroundColor: theme.backgroundLightColor,
                }}
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "Home",
                        drawerIcon: ({ focused }) => (
                            <Icon2
                                name="home"
                                color={focused ? theme.buttonText : theme.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="gamesettings"
                    options={{
                        drawerLabel: "Game Settings",
                        drawerIcon: ({ focused }) => (
                            <Icon2
                                name="cog"
                                color={focused ? theme.buttonText : theme.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="players"
                    options={{
                        drawerLabel: "Players",
                        drawerIcon: ({ focused }) => (
                            <Icon2
                                name="account-group"
                                color={focused ? theme.buttonText : theme.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="history"
                    options={{
                        drawerLabel: "History",
                        drawerIcon: ({ focused }) => (
                            <Icon2
                                name="history"
                                color={focused ? theme.buttonText : theme.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="statistics"
                    options={{
                        drawerLabel: "Statistics",
                        drawerIcon: ({ focused }) => (
                            <Icon2
                                name="trending-up"
                                color={focused ? theme.buttonText : theme.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
            </Drawer>
        </>
    );
}