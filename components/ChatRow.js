import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { useTailwind } from 'tailwind-rn/dist'

const ChatRow = ({ matchDetails }) => {
    const navigaiton = useNavigation()
    const { user } = useAuth()
    const tw = useTailwind()
    const [matchedUserInfo, setMatchedUserInfo] = useState(null)

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    }, [matchDetails, user])

    return (
        <TouchableOpacity style={
            [tw('flex-row items-center py-3 px-5 bg-white px-3 my-1 rounded-lg'),
        styles.cardShadow]
            }>
            <Image style={tw('rounded-full h-16 w-16 mr-4')}
                source={{ uri: matchedUserInfo?.photoURL }} />
        </TouchableOpacity>
    )
}

export default ChatRow

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
          width:0,
          height:1
        },
        shadowOpacity: 0.2,
        shadowRadious: 1.41,
        elevation: 2
  }
})