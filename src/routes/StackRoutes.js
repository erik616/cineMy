import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Login } from "../pages/SignIn"
import { Registrer } from "../pages/SingUp"
import { Routes } from "."
import { Details } from "../pages/Details"

const Stack = createNativeStackNavigator()

export function StackRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="SingIn"
        >
            <Stack.Screen
                name="SingIn"
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SingUp"
                component={Registrer}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Homer"
                component={Routes}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Details"
                component={Details}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>
    )
}

