import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} from "react-native"

import { useNavigation } from "@react-navigation/native";

export function Header() {
    const navigate = useNavigation()

    function navSingUp () {
        navigate.navigate('SingUp')
    }

    function navSingIn () {
        navigate.navigate('SingIn')
    }

    return (
        <View style={styles.header}>
            <View style={{ flexDirection: "row", marginLeft: 20, gap: 2 }}>
                <TouchableHighlight
                    style={[styles.option, { borderBottomColor: "#000" }]}
                    onPress={() => navSingIn()}
                >
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold", bottom: 2 }}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.optionDisable]}
                    onPress={() => navSingUp()}
                >
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold", bottom: 2 }}>Register</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#8c8c8c",
        height: 50,
        backgroundColor: "#fff"
    },
    option: {
        height: 50,
        width: 120,
        borderRadius: 4,
        bottom: -2.3,
        backgroundColor: "#000",
        borderWidth: 2,
        borderColor: "#8c8c8c",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    optionDisable: {
        height: 50,
        width: 120,
        backgroundColor: "#000",
        borderWidth: 1,
        borderBottomColor: "#8c8c8c",
        alignItems: "center",
        justifyContent: "flex-end"
    }
})