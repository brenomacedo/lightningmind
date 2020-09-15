import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Lottie from 'lottie-react-native'

const BuyPremium = () => {
    return (
        <View style={styles.container}>
            <Lottie style={styles.animation} loop autoPlay source={require('../Animations/star.json')} />
            <View>
                <Text style={styles.text}>Wanna store your favorite videos in a tab just for you? Buy prime now!</Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009dff",
        alignItems: 'center',
        padding: 40
    },
    animation: {
        width: 300
    },
    text: {
        fontSize: 18,
        fontFamily: "PTSans_700Bold",
        color: 'white',
        textAlign: 'center',
    }
})

export default BuyPremium