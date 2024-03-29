import { View, Text } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'

const ReceiverMessage = ({message}) => {
  const tw = useTailwind()
  return (
    <View style={[tw('bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14'), {
      alignSelf: 'flex-start'
  }]}>
    <Image
    style={tw('h-12 w-12 rounded-full absolute top-0 -left-14')}
     source={{uri: message.photoUrl}}
    />
    <Text
    style={tw('text-white')}
    >{messages.message}</Text>
  </View>
  )
}

export default ReceiverMessage