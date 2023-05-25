import { useEffect, useState } from "react";

import {
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    Text,
} from "react-native";

import { API_KEY, API } from "../../utils/API";


export function Search() {
    const [topMovies, setTopMovies] = useState([])

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
            <Text style={styles.title}>Search</Text>
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
});


