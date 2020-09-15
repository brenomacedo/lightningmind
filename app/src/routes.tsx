import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import InitialScreen from './Screens/InitialScreen'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Profile from './Screens/Profile'
import CustomDrawerContent from './Components/CustomDrawerContent'
import Feed from './Screens/Feed'
import CreatePost from './Screens/CreatePost'
import MyPosts from './Screens/MyPosts'
import MyFavorites from './Screens/MyFavorites'
import BuyPremium from './Screens/BuyPremium'

const StackNavigator = createStackNavigator()
const DrawerNavigator = createDrawerNavigator()
const PremiumStackNavigator = createStackNavigator()

const PremiumScreen = () => {
    return (
        <PremiumStackNavigator.Navigator headerMode="none" initialRouteName='Feed'>
            <PremiumStackNavigator.Screen name='Feed' component={Feed} />
            <PremiumStackNavigator.Screen name='BuyPremium' component={BuyPremium} />
        </PremiumStackNavigator.Navigator>
    )
}

const LogedIn = () => {
    return (
        <DrawerNavigator.Navigator initialRouteName='Feed' drawerContent={props => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
            style: {
                backgroundColor: '#010026',
                padding: 5
            },
            activeBackgroundColor: 'white',
            activeTintColor: '#010026',
            inactiveBackgroundColor: 'transparent',
            inactiveTintColor: 'white'
        }}>
            <DrawerNavigator.Screen name='Profile' component={Profile} options={{
                drawerLabel: (props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome style={{ marginLeft: 10}} name='user' color={props.color}
                        size={20}/>
                        <Text style={{ marginLeft: 20, fontSize: 16,
                        fontFamily: 'PTSans_700Bold', color: props.color }}>Profile</Text>
                    </View>
                )
            }} />
            <DrawerNavigator.Screen name='Feed' component={PremiumScreen} options={{
                drawerLabel: (props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome style={{ marginLeft: 10}} name='book' color={props.color}
                        size={20}/>
                        <Text style={{ marginLeft: 20, fontSize: 16,
                        fontFamily: 'PTSans_700Bold', color: props.color }}>Feed</Text>
                    </View>
                )
            }} />
            <DrawerNavigator.Screen name='CreatePosts' component={CreatePost} options={{
                drawerLabel: (props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome style={{ marginLeft: 10}} name='plus' color={props.color}
                        size={20}/>
                        <Text style={{ marginLeft: 20, fontSize: 16,
                        fontFamily: 'PTSans_700Bold', color: props.color }}>Create Post</Text>
                    </View>
                )
            }} />
            <DrawerNavigator.Screen name='MyPosts' component={MyPosts} options={{
                drawerLabel: (props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome style={{ marginLeft: 10}} name='list' color={props.color}
                        size={20}/>
                        <Text style={{ marginLeft: 20, fontSize: 16,
                        fontFamily: 'PTSans_700Bold', color: props.color }}>My Posts</Text>
                    </View>
                )
            }} />
            <DrawerNavigator.Screen name='MyFavorites' component={MyFavorites} options={{
                drawerLabel: (props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome style={{ marginLeft: 10}} name='star' color={props.color}
                        size={20}/>
                        <Text style={{ marginLeft: 20, fontSize: 16,
                        fontFamily: 'PTSans_700Bold', color: props.color }}>My Favorites</Text>
                    </View>
                )
            }} />
        </DrawerNavigator.Navigator>
    )
}

const Routes = () => {
    return (
        <NavigationContainer>
            <StackNavigator.Navigator initialRouteName='Login' headerMode="none">
                <StackNavigator.Screen name='InitialScreen' component={InitialScreen} />
                <StackNavigator.Screen name='Login' component={Login} />
                <StackNavigator.Screen name='Register' component={Register} />
                <StackNavigator.Screen name='Logedin' component={LogedIn} />
            </StackNavigator.Navigator>
        </NavigationContainer>
    )
}

export default Routes