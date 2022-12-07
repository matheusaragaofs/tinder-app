import { View, Text,  TouchableOpacity, Image, StyleSheet} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../hooks/useAuth'
import { useTailwind } from 'tailwind-rn/dist'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper'
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import generateId from '../lib/generateId'
const HomeScreen = () => {
  const swipeRef = useRef(null)

  const tw = useTailwind()
  const { user } = useAuth()
  const navigation = useNavigation()

  useLayoutEffect(
    () => onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate('Modal')
      }
    })
  , [])

  const [ profiles, setProfiles ] = useState([])

 useEffect(() => { 
  const fetchCards = async () => {
    try {

      const passes = (await getDocs(collection(db,'users',user.uid,'passes'))).docs.map(doc => doc.id)
      const swipes = (await getDocs(collection(db,'users',user.uid,'swipes'))).docs.map(doc => doc.id)
      
      const passedUserIds = passes.length > 0 ? passes : ['test']
      const swipedUserIds = swipes.length > 0 ? swipes : ['test']

      const cardRef = query(collection(db, 'users'), where('id','not-in', [...passedUserIds, ...swipedUserIds]));
      const allCards = await getDocs(cardRef);


      const parsedCards = allCards.docs.filter(doc => doc.id !== user.uid).map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
      })
      setProfiles(parsedCards)

    } catch (error) {
      console.log('error', error)
    }
  }
 fetchCards()
} , [])

const swipeLeft =  (cardIndex) => {
  if (!profiles[cardIndex]) return;
  const userSwiped = profiles[cardIndex]
  setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped)
}
const swipeRight =  async (cardIndex) => {
  if (!profiles[cardIndex]) return;
  const userSwiped = profiles[cardIndex] 
  const loggedInProfile =  (await getDoc(doc(db, 'users', user.uid))).data()
  //check if the user swiped on you...
  const currDoc =  await getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid))
  if (currDoc.exists()){
      //user has matched with you before you matched with them...
      setDoc(doc(db,'users',user.uid, 'swipes', userSwiped.id), userSwiped)
      //Create a match
      setDoc(doc(db,'matches', generateId(user.uid, userSwiped.id)), {
        users: {
          [user.uid]: loggedInProfile,
          [userSwiped.id]: userSwiped
        }, 
        usersMatched: [user.uid, userSwiped.id],
        timestamp: serverTimestamp()
      })
      navigation.navigate('Match', {
        loggedInProfile,
        userSwiped
      })

    } else {
      //user has swiped as first interaction between the two or didnt get swiped on...
      setDoc(doc(db,'users',user.uid, 'swipes', userSwiped.id), userSwiped)
    }

  setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped)
}

  return (
    <SafeAreaView style={tw('flex-1')}>
      {/* HEADER */}
      <View style={tw('flex-row justify-between items-center relative px-5')}>
        <TouchableOpacity onPress={() => console.log('Logout')}>
          <Image style={tw('h-10 w-10 rounded-full')} source={{ uri: user.photoURL }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Modal')}>
          <Image style={tw('h-14 w-14 ')} source={require('../logo.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name='chatbubbles-sharp' size={30} color='#ff5864' />
        </TouchableOpacity>
      </View>
      {/* END OF HEADER */}
      {/* Cards */}
      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          backgroundColor='transparent'
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex) }
          onSwipedRight={(cardIndex) => swipeRight(cardIndex) }
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              }
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30"
                }
              }
            }
          }}
          cards={profiles} renderCard={card =>  card ? (
            <View key={card.id} style={tw('bg-white h-3/4 rounded-xl')}>
              <Image style={tw('h-full w-full rounded-xl absolute')} source={{ uri: card.photoURL }} />
              <View style={[
                styles.cardShadow,
                tw('absolute bottom-0 bg-white w-full h-20 flex-row justify-between px-6 py-2 items-center rounded-b-xl')]}> 
                  <View>
                    <Text style={tw('text-xl font-bold')}> {card.displayName}</Text>
                    <Text> {card.job}</Text>
                   </View> 
                   <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
              </View>
            </View>
          ): (
            <View style={
              [tw('relative bg-white h-3/4 rounded-xl justify-center items-center'), styles.cardShadow
            ]}> 
            <Text style={tw('font-bold pb-5')}>No more profiles</Text>
            <Image
            style={tw('h-20 w-20')}
            height={100}
            width={100}
            source={{uri: "https://links.papareact.com/6gb"}}
            />
            </View>
          )}
        />
        
      </View>
      <View style={tw('flex flex-row justify-evenly pb-5')}>
                <TouchableOpacity  onPress={()=> swipeRef.current.swipeLeft()} style={tw("items-center justify-center rounded-full w-16 h-16 bg-red-200")}>
                  <Entypo name='cross' size={24} color='red'/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=> swipeRef.current.swipeRight()} 
                style={tw("items-center justify-center rounded-full w-16 h-16 bg-green-200")}>
                  <AntDesign name='heart' size={24} color='green'/>
                </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

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