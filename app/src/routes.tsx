import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import InitialScreen from './Screens/InitialScreen'
import Login from './Screens/Login'
import Register from './Screens/Register'

const StackNavigator = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <StackNavigator.Navigator headerMode="none">
                <StackNavigator.Screen name='InitialScreen' component={InitialScreen} />
                <StackNavigator.Screen name='Login' component={Login} />
                <StackNavigator.Screen name='Register' component={Register} />
            </StackNavigator.Navigator>
        </NavigationContainer>
    )
}

export default Routes