import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import userReducer from './src/Reducers/userReducer'
import Routes from './src/routes'

const reducers = combineReducers({
  userReducer
})

const store = createStore(reducers)

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden={true} ></StatusBar>
        <Routes />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
