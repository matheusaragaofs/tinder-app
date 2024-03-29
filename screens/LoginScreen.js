import { View, Text, Button, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { useTailwind } from 'tailwind-rn/dist'

const LoginScreen = () => {
  const tw = useTailwind()
  const navigation = useNavigation()
  // const { signInWithGoogle, loading } = useAuth()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  return (
    <View style={tw('flex-1')} >
      <ImageBackground
        resizeMode='cover'
        style={tw('flex-1')}
        source={{uri:'https://tinder.com/static/tinder.png'}}
      >
        <TouchableOpacity style={[tw('absolute bottom-40 w-52 bg-white p-4 rounded-2xl'), {marginHorizontal: '25%'}]}>
        <Text style={tw('text-center')}>Sign in & get swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen