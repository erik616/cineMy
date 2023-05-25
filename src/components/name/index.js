import { StyleSheet, Text, TextInput, View } from "react-native";

export function Name({ name, nameMsg, placeholder, onChangeName }) {
    return (
        <View>
            <TextInput
                style={[
                    styles.input, {
                        borderBottomWidth: nameMsg ? 4 : 0,
                        borderColor: nameMsg ? "#e87c03" : null
                    }]}
                placeholderTextColor="#8c8c8c"
                placeholder={placeholder}
                value={name}
                onChangeText={onChangeName}
                textContentType="name"
            />
            {nameMsg && <Text style={styles.erroMsg}>{nameMsg}</Text>}
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