import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../hooks/useAuth'
import { useTailwind } from 'tailwind-rn/dist'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
const HomeScreen = () => {
  const user = { 
    photoURL: 'https://instagram.frec23-1.fna.fbcdn.net/v/t51.2885-19/288475390_693296685092013_1905504539709080227_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.frec23-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=_W0PqnmzhbAAX-8ciIf&tn=Jeh1JqqeXFBc3hTI&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAHSVm9CYrpDaZVleOL0PxOViqXKsAEFmhjyjc-0yzXVQ&oe=638F0239&_nc_sid=8fd12b'
  }
  const tw = useTailwind()
  // const { user } = useAuth()
    const navigate =  useNavigation()
  return (
    <SafeAreaView>
      {/* HEADER */}
      <View style={tw('flex-row justify-between items-center relative px-5')}>
        <TouchableOpacity onPress={()=>console.log('Logout')}>
        <Image  style={tw('h-10 w-10 rounded-full')} source={{uri: user.photoURL}}/>
        </TouchableOpacity>
      <TouchableOpacity>
        <Image style={tw('h-14 w-14 ')} source={require('../logo.png')}/>
      </TouchableOpacity>
      <TouchableOpacity >
        <Ionicons name='chatbubbles-sharp' size={30} color='#ff5864'/>
      </TouchableOpacity>
      </View>
      {/* END OF HEADER */}
      <Text>HomeScreen</Text>
      <Button onPress={() => navigate.navigate('Chat')} title='Go to Chat Screen'></Button>
    </SafeAreaView>
  )
}

export default HomeScreen