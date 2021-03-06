import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { useFonts, PTSans_400Regular } from '@expo-google-fonts/pt-sans'
import { FontAwesome as Fa } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, StackActions } from '@react-navigation/native'
import api from '../api/api'

const Register = () => {

    const [fontsLoaded] = useFonts({
        PTSans_400Regular
    })
    const [offset, setOffset] = useState(new Animated.Value(20))

    useEffect(() => {
        Animated.spring(offset, {
            toValue: 0,
            speed: 4,
            bounciness: 20,
            useNativeDriver: true
        }).start()
    }, [])
    

    const navigation = useNavigation()

    const goLogin = () => {
        navigation.navigate('Login')
    }
    const register = async () => {

        if(!name || !email || !password || !confirmPassword) {
            return Alert.alert('Error', 'Fill all the inputs!')
        }

        if(password !== confirmPassword) {
            return Alert.alert('Error', 'The passwords are differents')
        }

        try {
            await api.post('/user/create', {
                email, name, password
            })
            Alert.alert('Usuário criado com sucesso!')
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
            
        } catch(e) {
            Alert.alert('Error', 'Email already signed!')
        }
    }

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    if(!fontsLoaded) {
        return <Text>Loading App</Text>
    }


    return (
        <View style={styles.container}>
            <View style={styles.logoAndText}>
                <Image style={styles.registerImg} source={require('../../assets/img/trovao.png')}></Image>
                <Text style={styles.logoText}>Sign in to continue</Text>
            </View>
            <Animated.View style={[styles.form, {
                transform: [
                    { translateY: offset }
                ]
            }]}>
                <View style={styles.inputContainer}>
                    <Fa style={styles.inputIcon} name="envelope" color="white" size={20} />
                    <TextInput value={email} onChangeText={t => setEmail(t)}
                    placeholder='email' style={styles.formInput} />
                </View>
                <View style={styles.inputContainer} >
                    <Fa style={styles.inputIcon} name="user" color="white" size={20} />
                    <TextInput value={name} onChangeText={t => setName(t)}
                    placeholder='your name' style={styles.formInput} />
                </View>
                <View style={styles.inputContainer} >
                    <Fa style={styles.inputIcon} name="key" color="white" size={20} />
                    <TextInput value={password} onChangeText={t => setPassword(t)}
                    placeholder='password' secureTextEntry={true} style={styles.formInput} />
                </View>
                <View style={styles.inputContainer} >
                    <Fa style={styles.inputIcon} name="key" color="white" size={20} />
                    <TextInput value={confirmPassword} onChangeText={t => setConfirmPassword(t)}
                    placeholder='confirm your password' secureTextEntry={true} style={styles.formInput} />
                </View>
                <RectButton onPress={register} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </RectButton>
                <TouchableOpacity onPress={goLogin} >
                    <Text style={styles.createAcccount}>I already have an account</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#008782",
        alignItems: "center",
        justifyContent: "center"
    },
    logoAndText: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30
    },
    logo: {
        width: 100,
        height: 100
    },
    logoText: {
        color: 'white',
        paddingTop: 20,
        fontFamily: "PTSans_700Bold",
        fontSize: 20
    },
    logoSubText: {
        color: 'white',
        fontFamily: "PTSans_400Regular"
    },
    inputContainer: {
        width: "100%",
        alignItems: "center"
    },
    inputIcon: {
        position: "absolute",
        top: 25,
        left: 35
    },
    form: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    formInput: {
        marginTop: 15,
        width: '90%',
        paddingVertical: 8,
        paddingLeft: 55,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 500,
        fontSize: 20,
        fontFamily: 'PTSans_400Regular',
        color: 'white'
    },
    options: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    remember: {
        color: "white",
        fontFamily: "PTSans_400Regular",
        paddingRight: 20
    },
    createAcccount: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontFamily: "PTSans_700Bold",
        marginTop: 8
    },
    button: {
        width: "90%",
        backgroundColor: "#00a6ff",
        paddingVertical: 8,
        borderRadius: 500,
        marginTop: 15
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: "center"
    },
    imagePicker: {
        width: 100,
        height: 100,
        backgroundColor: '#00cfe6',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePicked: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    registerImg: {
        width: 70,
        height: 70
    }
})

export default Register