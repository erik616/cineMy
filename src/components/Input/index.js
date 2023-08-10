import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"

export function Input({ value, msg, placeholder, onChange, type, touch, press }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input, {
                        borderBottomWidth: msg ? 4 : 0,
                        borderColor: msg ? "#e87c03" : null
                    }, {
                        width: touch ? "85%" : "100%",
                    }
                ]}
                placeholderTextColor="#8c8c8c"
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                keyboardType={type}
            />
            {type === "web-search" &&
                <TouchableOpacity
                    style={styles.icon}
                    onPress={press}
                >
                    <Ionicons name="search" color="#333" size={40} />
                </TouchableOpacity>
            }
            {msg && <Text style={styles.erroMsg}>{msg}</Text>}
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#333333",
    },
    input: {
        height: 60,
        paddingLeft: 18,
        color: "#8c8c8c",
        fontSize: 18,
    },
    icon: {
        width: "15%",
        height: "auto",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#8c8c8c",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    erroMsg: {
        fontSize: 16,
        color: "#e87c03",
        fontWeight: 500
    },
})