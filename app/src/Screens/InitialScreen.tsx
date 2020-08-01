import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { useFonts, PTSans_700Bold, PTSans_400Regular } from "@expo-google-fonts/pt-sans"
import { RectButton } from 'react-native-gesture-handler'

const InitialScreen = () => {

    const [fontsLoaded] = useFonts({
        PTSans_400Regular,
        PTSans_700Bold
    })

    if(!fontsLoaded) {
        return <Text>App Loading</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.initialScreenTop}>
                <LottieView style={styles.animation} source={require('../Animations/video.json')} autoPlay loop />
                <View style={styles.bar}></View>
                <Text style={styles.text}>
                    With LightningMind, you can share your shortfilms and spread you work through the world!
                    Get started now and see other videos, meet new people and more!
                </Text>
            </View>
            <RectButton style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#282c48",
        alignItems: 'center'
    },
    animation: {
        width: "90%",
        marginTop: 20
    },
    bar: {
        borderRadius: 30,
        backgroundColor: 'white',
        width: 150,
        padding: 3,
        marginTop: 40
    },
    initialScreenTop: {
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "white",
        textAlign: "center",
        padding: 30,
        fontSize: 18,
        fontFamily: "PTSans_700Bold"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontFamily: "PTSans_400Regular"
    },
    button: {
        backgroundColor: "#00eeff",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 20
    }
})

export default InitialScreen