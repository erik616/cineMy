import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    TouchableOpacity
} from "react-native";

import { API_SEARCH, API_IMG, API_KEY } from "../../utils/API";
import { Input } from "../../components/Input";


export function Search() {
    const [movie, setMovie] = useState('')
    const [topMovie, setTopMovie] = useState([])
    const [returnMsg, setReturnMsg] = useState('')

    const navigation = useNavigation()

    const getMovie = async () => {
        if (!movie) {
            setReturnMsg('Informe um titulo...')
            return
        }
        setReturnMsg('')
        const seacrMovie = `${API_SEARCH}?query=${movie}&api_key=${API_KEY}`
        const res = await fetch(seacrMovie)
        const data = await res.json()
        // console.log(seacrMovie);        

        setTopMovie(data.results);
    }

    // console.log(topMovie);

    function details(id) {
        console.log(id);
        navigation.setParams()
        navigation.navigate('Details', {
            params: {
                paramKey: id
            }
        })
    }

    function _renderCard({ data }) {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => details(data.id)}
            >
                <Image
                    style={styles.img}
                    source={{ uri: `${API_IMG}${data.poster_path}` }}
                />
                <Text>{data.info}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Search</Text>
            <Input
                placeholder="Pesquise por um titulo..."
                onChange={(value) => setMovie(value)}
                touch={true}
                press={getMovie}
                type="web-search"
                value={movie}
            />
            <Text style={styles.msg}>{returnMsg}</Text>

            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
            }}>
                <FlatList
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    data={topMovie}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <_renderCard data={item} />}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 36,
        paddingHorizontal: 16,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12
    },
    msg: {
        color: "#fff",
        fontSize: 20,
        marginVertical: 8
    },
    card: {
        width: "29.2%",
        height: 140,
        backgroundColor: "#fff",
        marginHorizontal: 8,
        borderRadius: 8,
        marginBottom: 20,
    },
    img: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        borderRadius: 8
    },
    info: {
        fontSize: 20,
        color: "#fff"
    },
});


