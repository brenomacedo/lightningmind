import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import { Video } from 'expo-av'
import VideoComponent from '../Components/VideoComponent'

const Feed = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.post}>
                <View style={styles.postAuthor}>
                    <View style={styles.postAuthorPic}></View>
                    <Text style={styles.postAuthorName}>Breno Macêdo</Text>
                </View>
                <View style={styles.postDescription}>
                    <Text style={styles.postDescriptionText}>
                        VIDEO
                    </Text>
                </View>
                <VideoComponent />
                <View style={styles.postOptions}>
                    <TouchableOpacity style={styles.postOptionsButton}>
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
            <View style={styles.post}>
                <View style={styles.postAuthor}>
                    <View style={styles.postAuthorPic}></View>
                    <Text style={styles.postAuthorName}>Breno Macêdo</Text>
                </View>
                <View style={styles.postDescription}>
                    <Text style={styles.postDescriptionText}>
                        Thats the description of my post
                    </Text>
                </View>
                <View style={styles.postVideo}>

                </View>
                <View style={styles.postOptions}>
                    <TouchableOpacity style={styles.postOptionsButton}>
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
            <View style={styles.post}>
                <View style={styles.postAuthor}>
                    <View style={styles.postAuthorPic}></View>
                    <Text style={styles.postAuthorName}>Breno Macêdo</Text>
                </View>
                <View style={styles.postDescription}>
                    <Text style={styles.postDescriptionText}>
                        Thats the description of my post
                    </Text>
                </View>
                <View style={styles.postVideo}>

                </View>
                <View style={styles.postOptions}>
                    <TouchableOpacity style={styles.postOptionsButton}>
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