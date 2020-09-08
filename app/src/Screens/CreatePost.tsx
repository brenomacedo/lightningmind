import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, RectButton } from 'react-native-gesture-handler'

const CreatePost = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.warning}>Warning: we only accept MP4 files!</Text>
            <TextInput style={styles.input} placeholder='Tell something about your video' />
            <RectButton style={[styles.button, { backgroundColor: '#c73878' }]}>
                <Text style={styles.buttonText}>Select the file</Text>
            </RectButton>
            <RectButton style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </RectButton>
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        backgroundColor: '#9ce6c0',
        justifyContent: 'center'
    },
    warning: {
        color: '#cf4265',
        fontFamily: 'PTSans_700Bold',
        fontSize: 20,
        marginTop: 40
    },
    input: {
        width: '100%',
        fontFamily: 'PTSans_700Bold',
        paddingLeft: 15,
        backgroundColor: 'white',
        borderRadius: 100,
        fontSize: 18,
        padding: 10,
        marginTop: 20
    },
    button: {
        backgroundColor: '#00f2ff',
        width: '100%',
        padding: 15,
        borderRadius: 50,
        fontFamily: 'PTSans_700Bold',
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white'
    }
})

export default CreatePost