import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer"
import { Feather } from '@expo/vector-icons'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (   
        <DrawerContentScrollView {...props}>
            <View style={styles.userContainer}>
                <View style={styles.userProfile}></View>
                <Text style={styles.profileName}>Breno Macêdo</Text>
            </View>
            <DrawerItem style={styles.drawerItem}
            label="Profile" labelStyle={styles.labelStyle} onPress={() => props.navigation.navigate('Profile')}
            icon={() => (
                <>
                    <Text>  </Text>
                    <Feather name='user' color='black' size={25} />
                </>
            )} />
            <DrawerItem style={styles.drawerItem} labelStyle={styles.labelStyle}
            label="Logout" onPress={() => {}} inactiveTintColor='red'
            icon={() => (
                <>
                    <Text>  </Text>
                    <Feather name='log-out' color='red' size={25} />
                </>
            )} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    drawerItem: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0
    },
    profileLabel: {
        marginLeft: 20
    },
    userContainer: {
        alignItems: 'center',
        marginVertical: 40
    },
    userProfile: {
        backgroundColor: 'blue',
        width: 80,
        height: 80,
        borderRadius: 40
    },
    labelStyle: {
        fontFamily: 'PTSans_700Bold',
        fontSize: 18
    },
    profileName: {
        fontFamily: 'PTSans_700Bold',
        fontSize: 20,
        marginTop: 20
    }
})

export default CustomDrawerContent