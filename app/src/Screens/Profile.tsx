import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, Alert } from 'react-native'
import { Feather as Fi, FontAwesome as Fa } from '@expo/vector-icons'
import { TextInput, RectButton } from 'react-native-gesture-handler'
import { PTSans_400Regular, PTSans_700Bold, useFonts } from '@expo-google-fonts/pt-sans'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import IState from '../Reducers/reducersTypes'
import api from '../api/api'
import { setUser } from '../ActionCreators/userActions'

const Profile = () => {

    interface IUserReducer {
        id: number
        name: string
        email: string
        image: string
        description: string
    }

    interface IImageResponse {
        pathImg: string
    }

    useEffect(() => {
        getPermissionsAsync()
    }, [])

    const [fontsLoaded] = useFonts({
        PTSans_400Regular,
        PTSans_700Bold
    })

    const navigation = useNavigation()
    
    const user = useSelector<IState, IUserReducer>(state => state.userReducer)
    const dispatch = useDispatch()
    const [name, setName] = useState(user.name)
    const [password, setPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [imageUri, setImageUri] = useState('')


    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const getPermissionsAsync = async () => {
        if(Constants.platform?.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status !== 'granted') {
                Alert.alert('Error', 'Sorry, we need camera roll permissions to pick your image')
            }
        }
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                exif: true
            })
            if(!result.cancelled) {
                const formData = new FormData()
                formData.append('file', {
                    name: `${Date.now()}.png`,
                    type: `${result.type}/${result.uri?.split('.')[(result.uri?.split('.').length - 1)]}`,
                    uri: result.uri
                } as unknown as Blob)
                try {
                    const { data } = await api.put<IImageResponse>(`/user/upload/${user.id}`, formData)
                    dispatch(setUser(user.id, user.name, user.description, user.email, data.pathImg))
                } catch {
                    Alert.alert('ocorreu um erro')
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateProfile = async () => {
        try {
            await api.put(`/user/update/${user.id}`, {
                name,
                password,
                currentPassword
            })

            dispatch(setUser(user.id, name, user.description, user.email, user.image))
            Alert.alert('user successfuly updated!!')
            setName('')
            setCurrentPassword('')
            setPassword('')
        } catch {
            Alert.alert('wrong password!')
        }
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
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{
                        uri: `http://10.0.0.106:3333/uploads/${user.image}`
                    }} style={styles.profilePic}></Image>
                </TouchableOpacity>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <Fa style={styles.inputIcon} size={20} color='white' name='user' />
                        <TextInput value={name} onChangeText={t => setName(t)}
                        style={styles.input}  placeholder='name' />
                    </View>
                    <View style={styles.inputContainer}>
                        <Fa style={styles.inputIcon} size={20} color='white' name='key' />
                        <TextInput value={password} secureTextEntry onChangeText={t => setPassword(t)}
                        style={styles.input}  placeholder='new password' />
                    </View>
                    <View style={styles.inputContainer}>
                        <Fa style={styles.inputIcon} size={20} color='white' name='key' />
                        <TextInput value={currentPassword} secureTextEntry onChangeText={t => setCurrentPassword(t)}
                        style={styles.input}  placeholder='current password' />
                    </View>
                    <RectButton onPress={updateProfile} style={styles.button}>
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