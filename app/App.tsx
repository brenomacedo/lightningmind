import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import InitialScreen from './src/Screens/InitialScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} ></StatusBar>
      <InitialScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
