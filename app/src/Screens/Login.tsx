import React from 'react'
import { View, Text, StyleSheet, Animated, TextInput, Image } from 'react-native'
import { useFonts, PTSans_400Regular } from '@expo-google-fonts/pt-sans'

const Login = () => {

    const [fontsLoaded] = useFonts([PTSans_400Regular])

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
            <View style={styles.form}>
                <TextInput style={styles.formInput} />
                <TextInput style={styles.formInput} />
            </View>
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
        justifyContent: "center"
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
    form: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    formInput: {
        marginTop: 15,
        width: '90%',
        paddingVertical: 8,
        paddingLeft: 45,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 500,
        fontSize: 20,
        fontFamily: 'PTSans_400Regular',
        color: 'white'
    }
})

export default Login