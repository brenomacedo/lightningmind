import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import { Video } from 'expo-av'
import VideoComponent from '../Components/VideoComponent'
import { useDispatch, useSelector } from 'react-redux'
import IState from '../Reducers/reducersTypes'
import { likePost, removeLike } from '../ActionCreators/postActions'
import { useNavigation } from '@react-navigation/native'
import api from '../api/api'

interface PostProps {
    uri: string
    description: string
    name: string
    image: string
    postId: number
    usersLikes: string
}

const Post: FC<PostProps> = ({ description, uri, image, name, postId, usersLikes }) => {

    const dispatch = useDispatch()
    const userId = useSelector<IState, number>(state => state.userReducer.id)
    const userStatus = useSelector<IState, string>(state => state.userReducer.status)
    const userFavortes = useSelector<IState, string>(state => state.userReducer.favorites)
    const [isFavorited, setIsFavorited] = useState(userFavortes.split(' ').includes(`${userId}`))
    const [isLiked, setIsLiked] = useState(usersLikes.split(' ').includes(`${userId}`))
    const [likesAmount, setLikesAmount] = useState(usersLikes === "" ? 0 : (usersLikes.split(" ").length - 1))
    const navigation = useNavigation()

    const like = () => {
        dispatch(likePost(postId))
        setLikesAmount(likesAmount + 1)
        setIsLiked(true)
    }

    const remove = () => {
        dispatch(removeLike(postId))
        setLikesAmount(likesAmount - 1)
        setIsLiked(false)
    }

    const favorite = async () => {
        if(userStatus === "NORMAL") {
            navigation.navigate('BuyPremium')
        } else {
            await api.put(`/user/favorites/add/${userId}/${postId}`)
            setIsFavorited(true)
        }
    }

    const removeFavorite = async () => {
        await api.put(`/user/favorites/remove/${userId}/${postId}`)
        setIsFavorited(false)
    }

    return (
        <View style={styles.post}>
            <View style={styles.postAuthor}>
                <Image resizeMode="cover" source={{
                    uri: image
                }} style={styles.postAuthorPic}></Image>
                <Text style={styles.postAuthorName}>{name}</Text>
            </View>
            <View style={styles.postDescription}>
                <Text style={styles.postDescriptionText}>
                    {description}
                </Text>
            </View>
            <VideoComponent uri={uri} />
            <View style={styles.postOptions}>
                {isLiked ? (<TouchableOpacity onPress={remove} style={styles.postOptionsButton}>
                    <View style={[styles.postOptionsBox, { backgroundColor: '#cf4265' }]}>
                        <FontAwesome name='heart' size={20} color='white' />
                        <Text style={[styles.postOptionsBoxText, { color: 'white' }]}>Like ({likesAmount})</Text>
                    </View>
                </TouchableOpacity>) : (<TouchableOpacity onPress={like} style={styles.postOptionsButton}>
                    <View style={styles.postOptionsBox}>
                        <FontAwesome name='heart' size={20} color='#cf4265' />
                        <Text style={styles.postOptionsBoxText}>Like ({likesAmount})</Text>
                    </View>
                </TouchableOpacity>)}
               {isFavorited ? (
                    <TouchableOpacity onPress={removeFavorite} style={styles.postOptionsButton}>
                        <View style={[styles.postOptionsBox, { backgroundColor: '#cf4265' }]}>
                            <FontAwesome name='star' size={20} color='white' />
                            <Text
                            style={[styles.postOptionsBoxText, { color: 'white' }]}>Unfavorite</Text>
                        </View>
                    </TouchableOpacity>
               ): (
                <TouchableOpacity onPress={favorite} style={styles.postOptionsButton}>
                    <View style={styles.postOptionsBox}>
                        <FontAwesome name='star' size={20} color='#cf4265' />
                        <Text style={styles.postOptionsBoxText}>Favorite</Text>
                    </View>
                </TouchableOpacity>
               )}
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
        borderRadius: 20
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

export default Post