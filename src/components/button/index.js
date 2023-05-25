import { StyleSheet, Text, TouchableHighlight } from "react-native";

export function Button({ disabled, text, onpress }) {
    return (
        <TouchableHighlight
            style={styles.button}
            disabled={disabled}
            onPress={onpress}
        >
            <Text
                style={styles.buttonText}
            >
                {text}
            </Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#6253be",
        height: 60,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff"
    },
})