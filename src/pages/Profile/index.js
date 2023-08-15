import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList,
    Text,
    Image,
    TouchableOpacity
} from "react-native";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { collectionAnalysis } from "../../config/firebase";
import { getDocs, query, where } from "firebase/firestore";

export function Profile() {
    const [user, setUser] = useState()
    const [movies, setMovies] = useState([])

    const navigation = useNavigation()

    function showMovies() {
        navigation.navigate("Movies", {
            screen: 'Movies'
        })
    }

    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.navigate("SingIn")
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    function _renderButton() {
        return (
            <TouchableOpacity
                onPress={showMovies}
                style={styles.card}
            >
                <MaterialCommunityIcons name="movie-open-check" color="#8c8c8c" size={45}></MaterialCommunityIcons>
                <Text style={{
                    fontSize: 30,
                    color: "#fff",
                    fontWeight: "800"
                }}>
                    Movies
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Perfil</Text>

            <_renderButton />

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
        color: "#ffff",
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
        height: 80,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        borderRadius: 50,
        overflow: "hidden",
        marginTop: 50,
        marginBottom: 12,
        backgroundColor: "#1C2026",
        alignItems: "center",
        gap: 10
        // backgroundColor: "#8c8c8c"
    },
});
