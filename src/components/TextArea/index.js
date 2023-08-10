import { StyleSheet, Text, TextInput, View } from "react-native";

export function TextAaea({ value, placeholder, onChange }) {
    return (
        <View>
            <TextInput
                editable
                multiline
                numberOfLines={8}
                style={styles.input}
                placeholderTextColor="#8c8c8c"
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                textAlignVertical="top"
            />
        </View>)
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#333333",
        padding: 18,
        color: "#8c8c8c",
        fontSize: 18,
    },
    erroMsg: {
        fontSize: 16,
        color: "#e87c03",
        fontWeight: 500
    },
})