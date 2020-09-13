import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import userReducer from './src/Reducers/userReducer'
import postReducer from './src/Reducers/postReducer'
import Routes from './src/routes'

const reducers = combineReducers({
  userReducer,
  postReducer
})

const store = applyMiddleware(thunk)(createStore)(reducers)

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
