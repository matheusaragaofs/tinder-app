import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import LoginScreen from './screens/LoginScreen'

const Stack = createNativeStackNavigator() // gives access to all routing capabilities within rn navigation
const StackNavigator = () => {
    const user = false;
  return (
    <Stack.Navigator>
        {user ? (
                <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
                </>
        ): (
      <Stack.Screen name="Login" component={LoginScreen} />
        )}
    </Stack.Navigator>
  )
}

export default StackNavigator