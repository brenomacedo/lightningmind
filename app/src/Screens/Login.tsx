import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TextInput, Image, TouchableOpacity } from 'react-native'
import { useFonts, PTSans_400Regular, PTSans_700Bold } from '@expo-google-fonts/pt-sans'
import { FontAwesome as Fa } from '@expo/vector-icons'
import { Switch } from 'react-native-gesture-handler'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Login = () => {

    const [fontsLoaded] = useFonts({
        PTSans_400Regular, PTSans_700Bold
    })
    const [isEnable, setIsEnable] = useState(false)
    const [offset, setOffset] = useState(new Animated.Value(20))

    const navigation = useNavigation()

    useEffect(() => {
        Animated.spring(offset, {
            toValue: 0,
            speed: 4,
            bounciness: 20,
            useNativeDriver: true
        }).start()
    }, [])

    const toggleSwitch = () => {
        setIsEnable(!isEnable)
    }

    const goRegister = () => {
        navigation.navigate('Register')
    }

    if(!fontsLoaded) {
        return <Text>Loading App</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoAndText}>
                <Image style={styles.logo} source={require('../../assets/img/trovao.png')} />
                <Text style={styles.logoText}>Welcome!</Text>
                <Text style={styles.logoSubText}>Log in to continue</Text>
            </View>
            <Animated.View style={[styles.form, {
                transform: [
                    { translateY: offset }
                ]
            }]}>
                <View style={styles.inputContainer}>
                    <Fa style={styles.inputIcon} name="user" color="white" size={20} />
                    <TextInput placeholder='login' style={styles.formInput} />
                </View>
                <View style={styles.inputContainer} >
                    <Fa style={styles.inputIcon} name="key" color="white" size={20} />
                    <TextInput placeholder='password' secureTextEntry={true} style={styles.formInput} />
                </View>
                <RectButton style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </RectButton>
                <View style={styles.options}>
                    <Text style={styles.remember}>Remember me</Text>
                    <Switch shouldActivateOnStart={true} value={isEnable} onValueChange={toggleSwitch}
                    trackColor={{
                        false: "#ff3898",
                        true: "#40cae3"
                    }} ios_backgroundColor="#40cae3" thumbColor={isEnable ? '#0084ff' : '#ff0051'} />
                </View>
                <TouchableOpacity onPress={goRegister}>
                    <Text style={styles.createAcccount}>Create an account</Text>
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
    }
})

export default Login