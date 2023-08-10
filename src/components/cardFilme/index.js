import { Image, StyleSheet, Text, View } from "react-native";
import { API_IMG } from "../../utils/API";

export function Card({ data, details }) {
    const banner = data.backdrop_path ? data.backdrop_path : data.poster_path
    const imgLink = `${API_IMG}${banner}`
    
    const poster = `${API_IMG}${data.poster_path}`
  
    return (
        <View style={[details === true ? styles.details : styles.container]}>
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
            <Text style={{color: "#000"}}>{data.title}</Text>
        </View>
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