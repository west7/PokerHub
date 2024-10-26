import React from "react";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { colors } from "../../../theme/theme";
import { useAuth } from "../../../context/AuthProvider";
import LoadingScreen from "../../../components/LoadingScreen";
import Icon from 'react-native-vector-icons/Entypo';
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Drawer } from 'expo-router/drawer'

export default function InsideLayout() {

    const { user, isLoading, signOut } = useAuth();

    const handleLogout = async () => {
        signOut();
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    const CustomDrawer = (props: DrawerContentComponentProps) => {
        return (
            <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>

                <TouchableOpacity style={{ backgroundColor: colors.baseColor, padding: 20 }} activeOpacity={0.5}>
                    <Text style={{ color: colors.textColor, fontSize: 20, fontWeight: "bold" }}>{user?.name}</Text>
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
            <Drawer
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.backgroundDarkColor,
                        shadowColor: "#000", // Use a dark color for a subtle shadow
                        elevation: 10,        // Android shadow depth, adjust to increase/decrease shadow
                        shadowOffset: {
                            width: 0,
                            height: 4,       // Higher height for more pronounced shadow
                        },
                        shadowOpacity: 0.25, // Adjust opacity for lighter or darker shadow
                        shadowRadius: 5,    // Blur effect for shadow smoothness
                    },
                    headerTintColor: colors.primaryLightColor,
                    headerTitle: "",
                    drawerStyle: {
                        backgroundColor: colors.baseColor,
                        paddingTop: 20,
                    },
                    drawerActiveBackgroundColor: colors.primaryLightColor,
                    drawerActiveTintColor: colors.buttonText,
                    drawerInactiveTintColor: colors.textColor,
                    drawerInactiveBackgroundColor: colors.backgroundLightColor,
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
                                color={focused ? colors.buttonText : colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="gamesettings"
                    options={{
                        drawerLabel: "Game Settings",
                        drawerIcon: ({focused}) => (
                            <Icon2
                                name="cog"
                                color={focused ? colors.buttonText : colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="players"
                    options={{
                        drawerLabel: "Players",
                        drawerIcon: ({focused}) => (
                            <Icon2
                                name="account-group"
                                color={focused ? colors.buttonText : colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="history"
                    options={{
                        drawerLabel: "History",
                        drawerIcon: ({focused}) => (
                            <Icon2
                                name="history"
                                color={focused ? colors.buttonText : colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="statistics"
                    options={{
                        drawerLabel: "Statistics",
                        drawerIcon: ({focused}) => (
                            <Icon2
                                name="trending-up"
                                color={focused ? colors.buttonText : colors.textColor}
                                size={18}
                            />
                        ),
                    }}
                />
            </Drawer>
        </>
    );
}