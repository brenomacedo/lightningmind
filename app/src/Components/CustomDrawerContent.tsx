import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps, DrawerContent }
from "@react-navigation/drawer"
import { FontAwesome } from '@expo/vector-icons'
import { TextInput, RectButton } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import IState from '../Reducers/reducersTypes'
const CustomDrawerContent = (props: DrawerContentComponentProps) => {

    const selector = useSelector<IState, any>(state => state.userReducer)

    return (   
        <DrawerContentScrollView {...props}>
            <View style={styles.customContentContainer}>
                <Image style={styles.logo} resizeMode='contain'
                source={require('../../assets/img/trovao.png')} />
            </View>
            <View style={styles.searchBar}>
                <TextInput placeholder='Search an post' style={styles.searchInput} />
                <RectButton style={styles.searchButton}>
                    <FontAwesome size={15} color='white' name='search' />
                </RectButton>
            </View>
            <DrawerContent {...props} />
            <View style={styles.bar}></View>
            <View style={styles.customContentContainer2}>
                <View style={styles.user}>
                    <View style={styles.userProfilePic}></View>
                    <Text style={styles.userName}>{selector.name}</Text>
                </View>
                <DrawerItem labelStyle={styles.labelStyle} label='Logout' activeTintColor='white'
                icon={() => <FontAwesome color='white' name='sign-out'
                size={20} style={{ marginLeft: 15 }} />}
                onPress={() => {console.log('logout')}} />
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    customContentContainer: {
        paddingTop: 60,
        paddingBottom: 50,
        alignItems: 'center'
    },
    customContentContainer2: {
        marginTop: 15,
        justifyContent: 'flex-end'
    },
    logo: {
        width: 70,
        height: 70
    },
    bar: {
        height: 1,
        backgroundColor: 'white',
        marginTop: 15
    },
    labelStyle: {
        color: 'white',
        fontFamily: 'PTSans_700Bold'
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 28,
        marginVertical: 15
    },
    userProfilePic: {
        width: 35,
        height: 35,
        borderRadius: 90,
        backgroundColor: 'white'
    },
    userName: {
        color: 'white',
        fontFamily: 'PTSans_700Bold',
        marginLeft: 20
    },
    searchBar: {
        padding: 15,
        flexDirection: 'row'
    },
    searchInput: {
        backgroundColor: 'white',
        marginRight: 10,
        flex: 1,
        borderRadius: 50,
        fontFamily: 'PTSans_700Bold',
        paddingLeft: 20
    },
    searchButton: {
        backgroundColor: '#34c0eb',
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CustomDrawerContent