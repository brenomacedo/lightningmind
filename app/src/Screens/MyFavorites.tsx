import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import UserPost from '../Components/UserPost'
import { useDispatch, useSelector } from 'react-redux'
import IState from '../Reducers/reducersTypes'
import { setUserPost } from '../ActionCreators/userPostActions'

const MyFavorites = () => {

    interface IUserReducer {
        id: number
        name: string
        email: string
        image: string
        description: string
    }

    interface IUser {
        id: number
        name: string
        email: string
        image: string
        description: string
    }
    
    interface IUserPostReducer {
        id: number
        description: string
        videoURL: string
        userId: number
        user: IUser
    }

    useEffect(() => {
        
    }, [])

    const posts = useSelector<IState, IUserPostReducer[]>(state => state.userPostReducer)
    const user = useSelector<IState, IUserReducer>(state => state.userReducer)
    const dispatch = useDispatch()

    return (
        <ScrollView style={styles.container}>
            {posts.map(post => {
                return (
                    <View></View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

export default MyFavorites