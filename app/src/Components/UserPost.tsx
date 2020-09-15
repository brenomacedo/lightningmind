import React, { FC } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import VideoComponent from './VideoComponent'
import api from '../api/api'
import { useDispatch } from 'react-redux'
import { setUserPost } from '../ActionCreators/userPostActions'
import { setPosts } from '../ActionCreators/postActions'

interface IUserPost {
    description: string
    uri: string
    name: string
    profile: string
    postId: number
    userId: number
}

const UserPost: FC<IUserPost> = ({ description, name, profile, uri, postId, userId }) => {
    const dispatch = useDispatch()

    const deleteF = async () => {
        await api.delete(`/post/delete/${postId}`)
        alert('deletar')
        dispatch(setUserPost(userId))
        dispatch(setPosts())
    }

    return (
        <View style={styles.post}>
            <View style={styles.postAuthor}>
                <Image source={{
                    uri: profile
                }}
                style={styles.postAuthorPic}></Image>
                <Text style={styles.postAuthorName}>{name}</Text>
            </View>
            <View style={styles.postDescription}>
                <Text style={styles.postDescriptionText}>
                    {description}
                </Text>
            </View>
            <VideoComponent uri={uri} />
            <View style={styles.postOptions}>
                <TouchableOpacity onPress={deleteF} style={styles.postOptionsButton}>
                    <View style={styles.postOptionsBox}>
                        <FontAwesome name='trash' size={20} color='#cf4265' />
                        <Text style={styles.postOptionsBoxText}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    post: {
        marginBottom: 30
    },
    postDescription: {

    },
    postVideo: {
        height: 350,
        backgroundColor: 'purple',
        borderRadius: 8
    },
    postDescriptionText: {
        fontFamily: 'PTSans_400Regular',
        fontSize: 20,
        marginBottom: 10
    },
    postAuthor: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    postAuthorPic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'black'
    },
    postAuthorName: {
        fontFamily: 'PTSans_700Bold',
        fontSize: 20,
        marginLeft: 10
    },
    postOptions: {
        marginTop: 12
    },
    postOptionsBox: {
        borderColor: '#cf4265',
        borderRadius: 8,
        borderWidth: 2,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    postOptionsButton: {
        flex: 1
    },
    postOptionsBoxText: {
        fontFamily: 'PTSans_700Bold',
        color: '#cf4265',
        marginLeft: 10
    }
})

export default UserPost