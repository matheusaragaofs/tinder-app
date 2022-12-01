import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../hooks/useAuth'

const LoginScreen = () => {
  const { user } = useAuth()
  console.log('user', user);
  return (
    <View>
      <Text>Login to the app</Text>
      <Text>User {user}</Text>
    </View>
  )
}

export default LoginScreen