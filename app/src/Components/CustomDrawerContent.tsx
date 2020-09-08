import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps, DrawerContent }
from "@react-navigation/drawer"
import { FontAwesome } from '@expo/vector-icons'
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (   
        <DrawerContentScrollView {...props}>
            <View style={styles.customContentContainer}>
                <Image style={styles.logo} resizeMode='contain'
                source={require('../../assets/img/trovao.png')} />
            </View>

            <DrawerContent {...props} />
            <View style={styles.bar}></View>
            <View style={styles.customContentContainer2}>
                <View style={styles.user}>
                    <View style={styles.userProfilePic}></View>
                    <Text style={styles.userName}>Breno Macêdo</Text>
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
    }
})

export default CustomDrawerContent