import { Image, StyleSheet, Text, View } from "react-native";
import { API_IMG } from "../../utils/API";

export function Card({data}) {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.img}
                source={{uri: `${API_IMG}${data.poster_path}`}}
            />
            <Text>{data.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 240,
        height: 320,
        backgroundColor: "#fff",
        marginHorizontal: 8,
        borderRadius: 8,
    },
    img:{
        height:"100%",
        width: "100%",
        resizeMode: "cover",
        borderRadius: 8
    }
})