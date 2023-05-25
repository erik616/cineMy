import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from "react-native";

import { getAuth, signOut } from "firebase/auth"

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

import { API_KEY, API } from "../../utils/API";
import { Card } from "../../components/cardFilme";


export function Favorites() {
    const navigation = useNavigation()
    const [topMovies, setTopMovies] = useState([])

    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.navigate("SingIn")
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    const getTopMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setTopMovies(data.results);
    }

    useEffect(() => {
        const topRateUrl = `${API}top_rated?api_key=${API_KEY}`

        getTopMovies(topRateUrl)
    }, [])

    console.log(topMovies[0])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Favorites</Text>
            <TouchableHighlight
                style={styles.logout}
                onPress={() => logout()}
            >
                <MaterialCommunityIcons name="exit-to-app" color="#fff" size={40}></MaterialCommunityIcons>
            </TouchableHighlight>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 36,
    },
    title: {
        paddingHorizontal: 16,
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12
    },
    logout: {
        position: "absolute",
        right: 14,
        bottom: 70,
        backgroundColor: "#6253be",
        height: 70,
        width: 70,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    }
});
