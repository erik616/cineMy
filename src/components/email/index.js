import { StyleSheet, Text, TextInput, View } from "react-native";

export function Email({ email, emailMsg, placeholder, onChangeEmail }) {
    return (
        <View>
            <TextInput
                style={[
                    styles.input, {
                        borderBottomWidth: emailMsg ? 4 : 0,
                        borderColor: emailMsg ? "#e87c03" : null
                    }]}
                placeholderTextColor="#8c8c8c"
                placeholder={placeholder}
                value={email}
                onChangeText={onChangeEmail}
                keyboardType="email-address"
            />
            {/* {emailMsg
                ? <Text
                    style={styles.erroMsg}
                >{emailMsg}</Text>
                : <Text
                    style={{ height: 0 }}
                ></Text>} */}
            {emailMsg && <Text style={styles.erroMsg}>{emailMsg}</Text>}
        </View>)
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#333333",
        height: 60,
        paddingLeft: 18,
        color: "#8c8c8c",
        fontSize: 18,
    },
    erroMsg: {
        fontSize: 16,
        color: "#e87c03",
        fontWeight: 500
    }
})