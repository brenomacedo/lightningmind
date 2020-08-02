import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import InitialScreen from './src/Screens/InitialScreen'
import Routes from './src/routes'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} ></StatusBar>
      <Routes />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
