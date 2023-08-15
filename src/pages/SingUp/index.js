import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView
} from "react-native";

import { Input } from "../../components/Input";
import { Pass } from "../../components/pass";
import { Button } from "../../components/button";

import * as Animatable from "react-native-animatable"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { firestore } from "../../config/firebase";


// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// WebBrowser.maybeCompleteAuthSession();

// const db = firestore.

export function Registrer() {
    const navigation = useNavigation()

    const [name, setName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [pass, setPass] = useState(undefined)
    const [eye, setEye] = useState(true)
    const [disabled, setDisable] = useState(true)
    const [nameMsg, SetMsgName] = useState('')
    const [emailMsg, SetMsgMail] = useState('')
    const [passMsg, SetMsgPass] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        function validation(name, email, senha,) {
            let validName = false;
            let validPass = false;
            let validMail = false;

            if (typeof name === "undefined") return SetMsgName('')
            if (typeof email === "undefined") return SetMsgMail('')
            if (typeof senha === "undefined") return SetMsgPass('')

            // setDisable(true)

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

            if (!name) {
                validName = false
                SetMsgName('Insira seu nome')
            } else {
                validName = true
                SetMsgName('')
            }


            if (validName && validMail && validPass) return true
        }

        let log = validation(name, email, pass)

        if (log) {
            setDisable(false)
        }

    }, [name, email, pass])

    const register = () => {
        email.trim()

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.navigate("SingIn")
            })

            .catch((error) => {
                setMsg('Erro ao cadastrar')
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }



    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView>
               
                    <Animatable.View
                        animation="fadeInUp"
                        style={styles.group}>
                        <Animatable.Text
                            delay={300}
                            animation="fadeInLeft"
                            style={styles.title}
                        >
                            Cadastrar
                        </Animatable.Text>

                        <Input
                            placeholder="Nome"
                            value={name}
                            onChange={(value) => setName(value)}
                            msg={nameMsg}
                            type="name"
                            touch={false}
                        />

                        <Input
                            placeholder='Email'
                            value={email}
                            onChange={(value) => setEmail(value)}
                            msg={emailMsg}
                            type="email-address"
                            touch={false}
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
                                text="Enviar"
                                disabled={disabled}
                                onpress={() => register()}
                            />

                            {msg && <Text style={{
                                fontSize: 16,
                                color: "#e87c03",
                                fontWeight: 500,
                                alignSelf: "center"
                            }}>{msg}</Text>}

                        </View>

                    </Animatable.View>
              
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 10,
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

