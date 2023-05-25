import { StyleSheet, Text, TextInput, View } from "react-native";

export function Fone({ number, numberMsg, placeholder, onChangeNumber }) {
    return (
        <View>
            <TextInput
                style={[
                    styles.input, {
                        borderBottomWidth: numberMsg ? 4 : 0,
                        borderColor: numberMsg ? "#e87c03" : null
                    }]}
                placeholderTextColor="#8c8c8c"
                placeholder={placeholder}
                value={number}
                onChangeText={onChangeNumber}
            />
            {numberMsg && <Text style={styles.erroMsg}>{numberMsg}</Text>}
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