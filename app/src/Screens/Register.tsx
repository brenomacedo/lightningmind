import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { useFonts, PTSans_400Regular } from '@expo-google-fonts/pt-sans'
import { FontAwesome as Fa } from '@expo/vector-icons'
// import Constants from 'expo-constants'
// import * as Permissions from 'expo-permissions'
// import * as ImagePicker from 'expo-image-picker'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../ActionCreators/userActions'
import IState from '../Reducers/reducersTypes'

const Register = () => {

    const [fontsLoaded] = useFonts({
        PTSans_400Regular
    })
    const [offset, setOffset] = useState(new Animated.Value(20))
    const [imageUri, setImageUri] = useState<string>('')

    useEffect(() => {
        Animated.spring(offset, {
            toValue: 0,
            speed: 4,
            bounciness: 20,
            useNativeDriver: true
        }).start()
    }, [])

    const dispatch = useDispatch()
    const user = useSelector((state: IState) => state.userReducer.name)

    const navigation = useNavigation()

    // const getPermissionsAsync = async () => {
    //     if(Constants.platform?.ios) {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    //         if(status !== 'granted') {
    //             Alert.alert('Error', 'Sorry, we need camera roll permissions to pick your image')
    //         }
    //     }
    // }

    // const pickImage = async () => {
    //     try {
    //         let result = await ImagePicker.launchImageLibraryAsync()
    //         if(!result.cancelled) {
    //             setImageUri(result.uri)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    const goLogin = () => {
        navigation.navigate('Login')
    }
    const register = () => {
        dispatch(setUser('aaaaa'))
    }

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
                    <Fa style={styles.inputIcon} name="user" color="white" size={20} />
                    <TextInput placeholder='login' style={styles.formInput} />
                </View>
                <View style={styles.inputContainer}>
                    <Fa style={styles.inputIcon} name="envelope" color="white" size={20} />
                    <TextInput placeholder='email' style={styles.formInput} />
                </View>
                <View style={styles.inputContainer} >
                    <Fa style={styles.inputIcon} name="key" color="white" size={20} />
                    <TextInput placeholder='password' secureTextEntry={true} style={styles.formInput} />
                </View>
                <View style={styles.inputContainer} >
                    <Fa style={styles.inputIcon} name="key" color="white" size={20} />
                    <TextInput placeholder='confirm your password' secureTextEntry={true} style={styles.formInput} />
                </View>
                <RectButton onPress={register} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </RectButton>
                <TouchableOpacity onPress={goLogin} >
                    <Text style={styles.createAcccount}>I already have an account</Text>
                </TouchableOpacity>
            </Animated.View>
            <Text>{user}</Text>
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