import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Feather as Fi, FontAwesome as Fa } from '@expo/vector-icons'
import { TextInput, RectButton } from 'react-native-gesture-handler'
import { PTSans_400Regular, PTSans_700Bold, useFonts } from '@expo-google-fonts/pt-sans'
import { useNavigation, DrawerActions } from '@react-navigation/native'

const Profile = () => {

    const [fontsLoaded] = useFonts({
        PTSans_400Regular,
        PTSans_700Bold
    })

    const navigation = useNavigation()

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }
    
    if(!fontsLoaded) {
        return <Text>Loading</Text>
    }

    return (
        <View style={styles.profileContainer}>
            <TouchableOpacity onPress={openDrawer} style={styles.hamburger}>
                <Fi name='menu' size={25} color='white' />
            </TouchableOpacity>
            <View style={styles.profile}>
                <TouchableOpacity>
                    <View style={styles.profilePic}>
                        <Fi name='user' color='white' size={25} />
                    </View>
                </TouchableOpacity>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <Fa style={styles.inputIcon} size={20} color='white' name='user' />
                        <TextInput style={styles.input}  placeholder='name' />
                    </View>
                    <View style={styles.inputContainer}>
                        <Fa style={styles.inputIcon} size={20} color='white' name='envelope' />
                        <TextInput style={styles.input}  placeholder='email' />
                    </View>
                    <View style={styles.inputContainer}>
                        <Fa style={styles.inputIcon} size={20} color='white' name='key' />
                        <TextInput style={styles.input}  placeholder='new password' />
                    </View>
                    <View style={styles.inputContainer}>
                        <Fa style={styles.inputIcon} size={20} color='white' name='key' />
                        <TextInput style={styles.input}  placeholder='current password' />
                    </View>
                    <RectButton style={styles.button}>
                        <Text style={styles.buttonText}>Update</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: '#008782',
        flex: 1
    },
    hamburger: {
        padding: 30,
        marginTop: Platform.OS === 'ios' ? 20 : 0
    },
    profile: {
        alignItems: 'center',
        marginTop: 50,
        flex: 1
    },
    profilePic: {
        width: 100,
        height: 100,
        backgroundColor: '#03f0fc',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputs: {
        width: '100%',
        alignItems: 'center',
        marginTop: 30
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: '90%',
        paddingVertical: 8,
        paddingLeft: 55,
        borderRadius: 50,
        marginTop: 15,
        fontSize: 20,
        color: 'white',
        fontFamily: 'PTSans_400Regular'
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
    inputContainer: {
        width: '100%',
        alignItems: 'center'
    },
    inputIcon: {
        position: 'absolute',
        top: 26,
        left: 38
    }
})

export default Profile