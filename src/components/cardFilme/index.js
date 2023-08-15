import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { API_IMG } from "../../utils/API";

import { useNavigation } from "@react-navigation/native";

export function Card({ data, details, home }) {
    const banner = data.backdrop_path ? data.backdrop_path : data.poster_path
    const imgLink = `${API_IMG}${banner}`

    const poster = `${API_IMG}${data.poster_path}`

    const navigation = useNavigation()

    function callFunction(id) {
        if (!home) return
        goMovie(id)
    }

    function goMovie(id) {
        navigation.navigate('Details', {
            params: {
                paramKey: id
            }
        })
    }

    return (
        <TouchableOpacity
            style={[details === true ? styles.details : styles.container]}
            activeOpacity={1}
            onPress={() => callFunction(data.id)}
        >
            <Image
                style={[styles.img,
                details === true
                    ? { borderRadius: 0 }
                    : { borderRadius: 8 }
                ]}
                source={{
                    uri: details === true
                        ? `${imgLink}`
                        : `${poster}`
                }}
            />
            <Text style={{ color: "#000" }}>{data.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 240,
        height: 320,
        marginHorizontal: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    details: {
        width: "100%",
        height: 260,
        marginHorizontal: 0,
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    img: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
    }
})