import { View, Text } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn'
const TesteScreen = () => {
    const tw = useTailwind()
  return (
    <View style={tw('flex-1 justify-center items-center')}>
      <Text style={tw('text-red-500')}>TesteScreen</Text>
    </View>
  )
}

export default TesteScreen