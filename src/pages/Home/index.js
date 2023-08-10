import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";

import { useNavigation } from "@react-navigation/native";

import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Dimensions,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";

import Carousel from "react-native-snap-carousel";

import { API_KEY, API, API_LIST, API_IMG } from "../../utils/API";
import { Card } from "../../components/cardFilme";
// import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const screenHeigth = Dimensions.get('window').height * 0.70
const screenWidth = Dimensions.get('window').width



function createIdList() {
    const id_list = Math.round(Math.random() * (20 - 1) + 1);
    return id_list
}


export function Home() {
    const carouselRef = useRef(null)

    const route = useRoute()

    const [mail, setMail] = useState('')
    const [topMovies, setTopMovies] = useState([])
    const [carrMovies, setCarrMovies] = useState([])
    const [background, setBackground] = useState(carrMovies[0]?.poster_path)

    const navigation = useNavigation()

    // RECUPERA USUARIO
    useEffect(() => {
        async function getName() {
            const name = await route.params?.data
            setMail(name)
        }

        getName()
    }, [route.params?.data])
    const user = nameUser(mail)

    //TOP FILMES
    const getTopMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setTopMovies(data.results);
    }

    useEffect(() => {
        const topRateUrl = `${API}top_rated?api_key=${API_KEY}`

        getTopMovies(topRateUrl)
    }, [])


    //CARROSEL FILMES
    const getCarrMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setCarrMovies(data.results)
    }


    // LISTA DE FILMES PARA O CAROSEL
    useEffect(() => {
        const carrUrl = `${API_LIST}${createIdList()}?page=1&api_key=${API_KEY}`
        console.log("Num List", createIdList());
        getCarrMovies(carrUrl)
    }, [])


    function details(id) {
        navigation.setParams()
        navigation.navigate('Details', {
            params: {
                paramKey: id
            }
        })
    }

    // COMPONENTE DO CAROUSEL
    const _renderItem = ({ item }) => {
        return (
            <View style={{ position: "absolute", bottom: 48, }}>
                <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => details(item.id)}
                >
                    <Image
                        source={{ uri: `${API_IMG}${item.poster_path}` }}
                        style={styles.carouselImg}
                    />
                    <Text style={styles.carouselText}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1, height: screenHeigth }}>
                <View style={{ ...StyleSheet.absoluteFill, backgroundColor: "#000" }}>
                    <ImageBackground
                        source={{ uri: `${API_IMG}${background || carrMovies[0]?.poster_path}` }}
                        style={styles.imgBg}
                        blurRadius={8}
                    >

                        <View style={styles.viewSlide}>
                            <Carousel
                                style={styles.carousel}
                                ref={carouselRef}
                                data={carrMovies}
                                renderItem={_renderItem}
                                sliderWidth={screenWidth}
                                itemWidth={220}
                                inactiveSlideOpacity={0.5}
                                onSnapToItem={(index) => {
                                    setBackground(carrMovies[index]?.poster_path)
                                }}
                            />
                        </View>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.65)', 'rgba(0,0,0,1)']}
                            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 50 }}
                        />

                    </ImageBackground>
                </View>
            </View>


            <View style={styles.movies}>
                <Text style={styles.title}>Em alta</Text>
                {/* {topMovies && topMovies.map((movie) => <Text style={styles.title}>{movie.title}</Text>)} */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={topMovies}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <Card data={item} type="normal" />}
                    horizontal={true}
                />
            </View>

            <View style={{ height: 70 }}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    imgBg: {
        flex: 1,
        width: null,
        height: null,
        opacity: 1,
        justifyContent: "flex-start",
        backgroundColor: "#000"
    },
    title: {
        paddingHorizontal: 16,
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12
    },
    viewSlide: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    carousel: {
        flex: 1,
        overflow: "visible"
    },
    carouselImg: {
        alignSelf: "center",
        width: 220,
        height: 340,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    carouselText: {
        padding: 10,
        color: "#fff",
        bottom: 14,
        fontWeight: "bold",
        fontSize: 18,
    },
    movies: {
    }
});

function nameUser(mail) {
    let name
    let indexs = [mail.indexOf('.'), mail.indexOf('@')]
    // console.log(indexs);

    if (indexs[0] < indexs[1]) {
        name = mail.substring(0, mail.indexOf('.'));
    } else {
        name = mail.substring(0, mail.indexOf('@'));
    }

    return name
}
