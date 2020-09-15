import React, { FC } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import { Video } from 'expo-av'
import VideoComponent from '../Components/VideoComponent'
import { useDispatch, useSelector } from 'react-redux'
import IState from '../Reducers/reducersTypes'
import { likePost } from '../ActionCreators/postActions'

interface PostProps {
    uri: string
    description: string
    name: string
    image: string
}

const Post: FC<PostProps> = ({ description, uri, image, name }) => {

    const selector = useSelector<IState>(state => state.userReducer.id)
    const dispatch = useDispatch()

    const like = () => {
        dispatch(likePost(1))
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
                <TouchableOpacity onPress={like} style={styles.postOptionsButton}>
                    <View style={styles.postOptionsBox}>
                        <FontAwesome name='heart' size={20} color='#cf4265' />
                        <Text style={styles.postOptionsBoxText}>Like</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOptionsButton}>
                    <View style={styles.postOptionsBox}>
                        <FontAwesome name='star' size={20} color='#cf4265' />
                        <Text style={styles.postOptionsBoxText}>Favorite</Text>
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