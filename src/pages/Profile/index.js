import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    Image
} from "react-native";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { collectionAnalysis } from "../../config/firebase";
import { getDocs, query, where } from "firebase/firestore";

export function Profile() {
    const [user, setUser] = useState()
    const [movies, setMovies] = useState([])

    const navigation = useNavigation()

    useEffect(() => {
        const profile = navigation.addListener("focus", () => {
            console.log("Profile");
            auth()
        })
        function auth() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/auth.user
                    getAnalysisMovies(user.uid)
                }
            });
        }

        async function getAnalysisMovies(user) {
            const q = query(collectionAnalysis, where('user', '==', user))

            const array = []
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    array.push(doc.data())
                }
            })

            setUser(user)
            setMovies(array)
        }

        return profile
    }, [])



    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.navigate("SingIn")
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    console.log("Movies", movies);


    function _card({ data }) {
        console.log("Filme", data.url);
        return (
            <View
                style={styles.card}
            >
                <Image
                    style={styles.img}
                    source={{ uri: `${data.url}` }}
                />
                <View style={styles.details}>
                    <Text style={styles.title}>Title: {data.name}</Text>
                    <Text style={styles.info}>{data.analysis}</Text>
                </View>
            </View>
        )
    }
    function _renderList() {
        if (movies.length > 0) {
            return (
                <FlatList
                    data={movies}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={(item) => <_card data={item.item} type="details" />}
                />
            )
        } else {
            return <Text style={{ fontSize: 16, color: "#8c8c8c" }}>Não há filmes</Text>
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Filmes comentados</Text>

            <_renderList />

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
        paddingHorizontal: 16,
    },
    title: {
        color: "#000",
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
    },
    card: {
        width: "100%",
        height: 200,
        flexDirection: "row",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 12
    },
    img: {
        height: "100%",
        width: "40%",
        resizeMode: "cover",
        backgroundColor: "#fff"
    },
    details: {
        width: "60%",
        height: "100%",
        // backgroundColor: "#8c8c8c",
        padding: 8,
        backgroundColor: "#fff",
    },
    info: {
        color: "#000",
        fontSize: 16,
        fontWeight: "500",
    },
});
