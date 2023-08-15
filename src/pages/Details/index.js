import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    View
} from "react-native";

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { API, IMG, API_KEY } from "../../utils/API";
import { TextAaea } from "../../components/TextArea";
import { Card } from "../../components/cardFilme";
import { Button } from "../../components/button";
import { getDocs, addDoc, query, where } from "firebase/firestore";
import { collectionAnalysis } from "../../config/firebase";

export function Details() {
    const [movie, setmovie] = useState([])
    const [analysis, setAnalysis] = useState('')
    const [user, setUser] = useState('')
    const [url, setUrl] = useState('')
    const [data, setData] = useState({})

    const route = useRoute()
    const { params } = route.params

    useEffect(() => {
        const movieUrl = `${API}${params.paramKey}?api_key=${API_KEY}`
        getMovie(movieUrl)
    }, [])
    const getMovie = async (url) => {
        const response = await fetch(url)
        const data = await response.json()

        setmovie(data)
    }
    // console.log(movie);

    useEffect(() => {
        async function getAnalysis() {
            // const q = query(collectionAnalysis, where('analysis', "==", "arte"))
            // const querySnapshot = await getDocs(q)
            // querySnapshot.forEach((doc) => {
            //     console.log(doc.id, '=>', doc.data());
            // })

            // const docRef = doc(collectionAnalysis())
            // console.log("MOVIE", movieAnalysis);

            const q = query(collectionAnalysis, where('user', '==', user))

            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                if (doc.data().movie == params.paramKey) {
                    setData(doc.data());
                }
            })
        }
        getAnalysis()
    }, [user])

    useEffect(() => {
        if (data !== false) {
            const dataAnalysis = data.analysis
            setAnalysis(dataAnalysis)
            return
        }
    }, [data])


    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUser(user.uid)
            }
        });
    }, [route.params?.data])
    // console.log(user);

    useEffect(() => {
        setUrl(`${IMG}${movie.poster_path}`)
    }, [movie])
    console.log(movie);
    function create() {

        try {
            addDoc(collectionAnalysis, {
                analysis: analysis,
                movie: params.paramKey,
                user: user,
                url: url,
                name: movie.title
            })
                .then(doc => console.log(`Criado: ${doc.id}`))
                .catch(console.log)

            setAnalysis('')
        } catch (error) {
            console.log(error);
        }
    }

    console.log(url);

    return (
        <SafeAreaView style={styles.container}>
                <View style={{ marginBottom: 12,marginTop: 24}}>
                    <Card data={movie} details={true} />
                    <Text style={styles.title}>{movie.original_title}</Text>
                </View>

                <View style={{ paddingHorizontal: 16, gap: 14 }}>

                    <TextAaea
                        placeholder="Faça um comentario sobre o filme"
                        onChange={(value) => setAnalysis(value)}
                        value={analysis}
                    />

                    <Button
                        text="Criar"
                        disabled={false}
                        onpress={create}
                    />
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        position: "absolute",
        paddingHorizontal: 16,
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        bottom: 0
    },
});
