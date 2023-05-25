import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Alert, Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native";

import { Email } from "../../components/email";
import { Pass } from "../../components/pass";
import { Button } from "../../components/button";

import * as Animatable from "react-native-animatable"

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { database } from "../../config/firebase";

// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// WebBrowser.maybeCompleteAuthSession();


export function Login() {
    const navigation = useNavigation()

    const [email, setEmail] = useState(undefined)
    const [pass, setPass] = useState(undefined)
    const [eye, setEye] = useState(true)
    const [disabled, setDisable] = useState(true)
    const [emailMsg, SetMsgMail] = useState('')
    const [passMsg, SetMsgPass] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        function validation(email, senha) {
            // setDisable(true)
            let validPass = true;
            let validMail = true;

            if (typeof email === "undefined" || typeof senha === "undefined") {
                return SetMsgMail('') && SetMsgPass('')
            }

            if (!senha) {
                validPass = false;
                SetMsgPass("Insira uma senha.")
            }
            else if (senha.length < 6 || senha.length > 12) {
                validPass = false;
                SetMsgPass("Senha precisa ter entre 6 a 12 caracteres.")
            } else {
                SetMsgPass('')
                validPass = true
            }

            if (!email) {
                validMail = false
                SetMsgMail("Insira um email")
            } else {
                let verif = /\S+@\S+\.\S+/;
                if (verif.test(email)) {
                    SetMsgMail('')
                    validMail = true
                } else {
                    SetMsgMail("Email invalido.")
                }
            }

            return validPass && validMail
        }

        let log = validation(email, pass)
        if (log) {
            setDisable(false)
        }
    }, [email, pass])

    // console.log(email);

    const logIn = () => {
        email.trim()

        // const data = await fetch('https://www.otaviomiranda.com.br/files/json/pessoas.json')
        // const users = await data.json()
        // console.table(users);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in 
                setMsg('')
                setPass('')
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('Homer', {
                    screen: 'Home',
                    params: {
                        data: user.uid
                    }
                })
                // ...
            })
            .catch((error) => {
                setMsg('Invalid e-mail or password')
                const errorCode = error.code;
                const errorMessage = error.message;
                // alert(errorMessage)
                console.log(errorCode);
            });


        // const user = users.find(el => el.email === email)
        // if (user) {
        //     senha = user.cpf.substring(0, 7).replace('.', '')
        //     // console.log(senha);
        //     if (senha === pass) {
        //         navigation.navigate('Homer', {
        //             screen: 'Home',
        //             params: {
        //                 data: email
        //             }
        //         })
        // navigation.getParent().addListener('blur', (e) => {
        //     'Homer'
        //         // })
        //     } else {
        //         Alert.alert(
        //             '',
        //             'Usuario Invalido'
        //         )
        //     }
        // } else {
        //     Alert.alert(
        //         '',
        //         'Usuario Invalido'
        //     )
        // }
    }

    function registrer() {
        navigation.navigate('SingUp')
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                navigation.navigate('Homer', {
                    screen: "Home",
                    params: {
                        data: uid
                    }
                })
            }
        });
    }, [])

    return (
        <SafeAreaView style={styles.container}>

            <DismissKeyboard>
                <Animatable.View
                    animation="fadeInUp"
                    style={styles.group}>
                    <Animatable.Text
                        delay={300}
                        animation="fadeInLeft"
                        style={styles.title}
                    >
                        Login
                    </Animatable.Text>

                    <Email
                        placeholder='Email ou numero de telefone'
                        email={email}
                        onChangeEmail={(value) => setEmail(value)}
                        emailMsg={emailMsg}
                    />


                    <Pass
                        placeholder='Senha'
                        value={pass}
                        onChangePass={(value) => setPass(value)}
                        securet={eye}
                        press={() => setEye(!eye)}
                        passMsg={passMsg}
                    />

                    <View style={{ gap: 12, marginTop: 24 }}>
                        <Button
                            text="Entrar"
                            disabled={disabled}
                            onpress={() => logIn()}
                        />

                        {msg && <Text style={{
                            fontSize: 16,
                            color: "#e87c03",
                            fontWeight: 500,
                            alignSelf: "center"
                        }}>{msg}</Text>}

                        <Text style={{ color: "#8c8c8c", fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>Ou</Text>

                        <Text
                            style={{ color: "#fff", fontSize: 24, fontWeight: "bold", alignSelf: "center", textDecorationLine: "underline" }}
                            onPress={() => registrer()}>Registre-se na plataforma</Text>
                    </View>

                </Animatable.View>
            </DismissKeyboard>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 40,
        alignItems: 'center',
    },
    title: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 12
    },
    group: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 40,
        gap: 25
    },
});


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)