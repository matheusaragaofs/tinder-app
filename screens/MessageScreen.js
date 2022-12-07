import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { useAuth } from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'
import { useTailwind } from 'tailwind-rn/dist'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
const MessageScreen = () => {
    const [ input, setInput ] = useState('')
    const [ isMessageSend, setIsMessageSend ] = useState(false)
    const [ messages, setMessages ] = useState([])
    const { params: { matchDetails } }  = useRoute()
    const { user } = useAuth()
    const tw = useTailwind()

    useEffect(() => {
        const getMessages =  async () => {
            const messages = await getDocs(query(collection(db,'matches', matchDetails.id, 'messages'), orderBy('timestamp','desc')))
            const parsedMessages = messages.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setMessages(parsedMessages)
        }
        getMessages()
    }, [db,matchDetails, isMessageSend])
    


    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].photoURL,
            message: input
        })
        setInput('')
        setIsMessageSend(!isMessageSend)
    }

  return (
    <SafeAreaView style={tw('flex-1')}>
        <Header callEnabled
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        />

        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw('flex-1')}
        keyboardVerticalOffset={10}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FlatList
                inverted={-1}
                data={messages}
                renderItem={({item: messages}) => messages.userId === user.uid ?
                 <SenderMessage key={messages.id} messages={messages}/> :
                 <ReceiverMessage key={messages.id} messages={messages}/>}
                keyExtractor={item => item.id}
                style={tw('pl-4')}
                />
            </TouchableWithoutFeedback>

      <View style={tw('flex-row justify-between  items-center border-t border-gray-200 px-5 py-2')}>
        <TextInput
            style={tw('h-10 text-lg')}
            placeholder='Send Message'
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
        />
        <Button title='Send' color="#FF5864" onPress={sendMessage}/>
      </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default MessageScreen