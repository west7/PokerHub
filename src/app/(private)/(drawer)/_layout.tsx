import React from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useAuth } from "../../../context/AuthProvider";
import LoadingScreen from "../../../components/LoadingScreen";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../../context/ThemeProvider";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";

export default function DrawerLayout() {
    const { user, isLoading, signOut } = useAuth();
    const { theme } = useTheme();

    if (isLoading) {
        return <LoadingScreen />;
    }

    const handleLogout = async () => {
        signOut();
    };

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
                    drawerItemStyle: {
                        marginVertical: 5,
                        borderRadius: 8,
                    },
                }}
                drawerContent={(props) => (
                    <View style={{ flex: 1, padding: 20, backgroundColor: theme.baseColor }}>
                        <TouchableOpacity activeOpacity={0.5} style={{ marginBottom: 20 }}>
                            <Text style={{ color: theme.textColor, fontSize: 20, fontWeight: "bold" }}>
                                {user?.name}
                            </Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            <DrawerItemList {...props} />
                        </View>

                        <ThemeSwitcher />

                        <DrawerItem
                            style={{
                                backgroundColor: theme.baseColor,
                                borderTopColor: theme.backgroundLightColor, marginBottom: 12,
                                borderTopWidth: 2,
                                borderRadius: 5,
                            }}
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

                    </View>
                )}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "Home",
                        drawerIcon: ({ color, size }) => <Icon2 name="home" color={color} size={size} />,
                    }}
                />
                <Drawer.Screen
                    name="gamesettings"
                    options={{
                        drawerLabel: "Game Settings",
                        drawerIcon: ({ color, size }) => <Icon2 name="cog" color={color} size={size} />,
                    }}
                />
                <Drawer.Screen
                    name="players"
                    options={{
                        drawerLabel: "Players",
                        drawerIcon: ({ color, size }) => (
                            <Icon2 name="account-group" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="history"
                    options={{
                        drawerLabel: "History",
                        drawerIcon: ({ color, size }) => <Icon2 name="history" color={color} size={size} />,
                    }}
                />
                <Drawer.Screen
                    name="statistics"
                    options={{
                        drawerLabel: "Statistics",
                        drawerIcon: ({ color, size }) => (
                            <Icon2 name="trending-up" color={color} size={size} />
                        ),
                    }}
                />
            </Drawer>
        </>
    );
}
