import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { Foundation, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTailwind } from 'tailwind-rn/dist'
const Header = ({ title, callEnabled }) => {
  const tw = useTailwind()
  const navigation = useNavigation()
    return (
    <View style={tw('p-4 flex-row items-center justify-between')}>
        <View style={tw('flex flex-row items-center')}>
            <TouchableOpacity 
            onPress={()=> navigation.goBack()}
            style={tw('p-2 flex flex-row')}>
            <Ionicons name='chevron-back-outline' size={34} color="#ff5864"/>
            <Text style={tw('text-2xl font-bold pl-2')}>{title}</Text>
            </TouchableOpacity>
        </View>
        {callEnabled && (
            <TouchableOpacity style={tw('rounded-full mr-4 p-4 bg-red-200')}>
                <Foundation style={tw('')} name='telephone' size={20} color='red' />
            </TouchableOpacity>
        )}
    </View>
  )
}

export default Header