import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import { Video } from 'expo-av'
import VideoComponent from '../Components/VideoComponent'
import Post from '../Components/Post'
import api from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import IState from '../Reducers/reducersTypes'
import { setPosts } from '../ActionCreators/postActions'
import { setFavorites } from '../ActionCreators/favoriteActions'

const Feed = () => {


    interface IUser {
        id: number
        name: string
        email: string
        image: string
        description: string
    }
    
    interface IPostReducer {
        id: number
        description: string
        videoURL: string
        userId: number
        user: IUser
        usersLikes: string
    }

    useEffect(() => {
        dispatch(setFavorites(userId))
    }, [])

    const dispatch = useDispatch()

    const posts = useSelector<IState, IPostReducer[]>(state => state.favoriteReducer)
    const userId = useSelector<IState, number>(state => state.userReducer.id)

    return (
        <ScrollView style={styles.container}>
            {posts.map(post => {
                return (
                    <Post usersLikes={post.usersLikes} postId={post.id} key={post.id} name={post.user.name}
                    uri={`http://10.0.0.106:3333/uploads/videos/${post.videoURL}`}
                    image={`http://10.0.0.106:3333/uploads/${post.user.image}`}
                    description={post.description} />
                )
            })}
        </ScrollView>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        width: (Dimensions.get('screen').width / 2) - 15
    },
    postOptionsBoxText: {
        fontFamily: 'PTSans_700Bold',
        color: '#cf4265',
        marginLeft: 10
    }
})

export default Feed