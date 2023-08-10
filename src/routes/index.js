import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home } from "../pages/Home"
import { Search } from "../pages/Search"
import { Profile } from "../pages/Profile"

import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"

// import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet } from "react-native"

const Tab = createBottomTabNavigator()

export function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#333333",


                tabBarStyle: {
                    position: "absolute",
                    borderTopWidth: 0,
                    backgroundColor: "#333333",
                    bottom: 10,
                    borderRadius: 50,
                    maxWidth: 200,
                    left: 100,
                },
                tabBarBackground: () => (
                    <BlurView tint="dark" intensity={90}>
                        {/* <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.80)', 'rgba(0,0,0,1)']}
                            style={styles.background}
                        /> */}
                    </BlurView>
                )
            }}
        >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="home" color="#fff" size={size} />
                        }
                        return <Ionicons name="home-sharp" color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="search-sharp" color="#fff" size={size} />
                        }
                        return <Ionicons name="search-outline" color={color} size={size} />
                    }
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="heart-sharp" color="#fff" size={size} />
                        }
                        return <Ionicons name="heart" color={color} size={size} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 50
    }
})