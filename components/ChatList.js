import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from '../hooks/useAuth'
import ChatRow from './ChatRow'

const ChatList = () => {
    const tw = useTailwind
    const [matches, setMatches] = useState([])
    const { user } = useAuth()
    useEffect(() => {
        const getMatches = async () => {
            const matches = await getDocs(query(collection(db, 'matches'), where('usersMatched', 'array-contains', user.uid)))
            setMatches(matches.docs.map((doc => ({
                id: doc.id,
                ...doc.data()
            }))))
        }
        getMatches()
    }, [user])
    return (
        matches.length > 0 ? (
        <FlatList 
            style={tw('h-full')}
            data={matches}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ChatRow matchDetails={item}/>}
        />) : (
            <View style={tw('p-5')}>
                <Text style={tw('text-center text-lg')}>No matches at the momment</Text>
            </View>
        )
    )
}

export default ChatList