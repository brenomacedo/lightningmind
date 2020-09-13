import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TextInput, RectButton } from 'react-native-gesture-handler'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import IState from '../Reducers/reducersTypes'
import api from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../ActionCreators/postActions'

const CreatePost = () => {

    useEffect(() => {
        getPermissionsAsync() 
    }, [])

    const dispatch = useDispatch()

    const [uri, setUri] = useState('')
    const [description, setDescription] = useState('')

    const userId = useSelector<IState>(state => state.userReducer.id)

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
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                exif: true
            })
            if(!result.cancelled) {
                setUri(result.uri)   
            }
        } catch (e) {
            console.log(e)
        }
    }

    const post = async () => {

        const formData = new FormData()

        formData.append('file', {
            name: `${Date.now()}.${uri.split('.')[(uri.split('.').length - 1)]}`,
            type: `video/${uri.split('.')[(uri.split('.').length - 1)]}`,
            uri
        } as unknown as Blob)

        formData.append('description', description)

        formData.append('userId', `${userId}`)

        try {
            await api.post('/post/create', formData)
            Alert.alert('Success', 'Your video has been created!')
            setUri('')
            setDescription('')
            dispatch(setPosts())
        } catch {
            Alert.alert('Error', 'Invalid file type')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.warning}>Warning: we only accept MP4 files!</Text>
            <TextInput value={description} onChangeText={t => setDescription(t)}
            style={styles.input} placeholder='Tell something about your video' />
            <RectButton onPress={pickImage} style={[styles.button, { backgroundColor: '#c73878' }]}>
                <Text style={styles.buttonText}>Select the file</Text>
            </RectButton>
            <Text style={styles.uri}>{`${uri.split('/')[(uri.split('/').length - 1)]}`}</Text>
            <RectButton onPress={post} style={styles.button}>
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
    },
    uri: {
        fontSize: 17,
        fontFamily: 'PTSans_700Bold',
        marginTop: 8
    }
})

export default CreatePost