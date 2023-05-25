import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"


export function Pass({ securet, value, onChangePass, placeholder, passMsg, press }) {

    return (
        <View>
            <View style={[
                styles.passCamp, {
                    borderBottomWidth: passMsg ? 4 : 0,
                    borderColor: passMsg ? "#e87c03" : null
                }]}
            >
                <TextInput
                    style={styles.inputPass}
                    placeholderTextColor="#8c8c8c"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangePass}
                    secureTextEntry={securet}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={press}
                >
                    {securet ?
                        <Ionicons name="eye" color="#8c8c8c" size={24} />
                        :
                        <Ionicons name="eye-off" color="#4c4c4c" size={24} />
                    }
                </TouchableOpacity>
            </View>
            {/* {passMsg
                ? <Text
                    style={styles.erroMsg}
                >{passMsg}</Text>
                : <Text
                    style={{ height: 0 }}
                ></Text>} */}
            {passMsg && <Text style={styles.erroMsg} >{passMsg}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    passCamp: {
        flexDirection: "row",
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#333333",
        height: 60,
        color: "#8c8c8c",
        alignItems: "center"
    },
    inputPass: {
        width: "85%",
        paddingLeft: 18,
        fontSize: 18,
    },
    icon: {
        width: "15%",
        height: "100%",
        alignItems: "center", justifyContent: "center"
    },
    erroMsg: {
        fontSize: 16,
        color: "#e87c03",
        fontWeight: 500
    }
})