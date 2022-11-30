import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const HomeScreen = () => {
    const navigate =  useNavigation()
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => navigate.navigate('Chat')} title='Go to Chat Screen'></Button>
    </View>
  )
}

export default HomeScreen