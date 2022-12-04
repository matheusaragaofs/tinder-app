import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'

// import * as Google from 'expo-google-app-auth'

const AuthContext = createContext({//initial state of context...
})


const config = {
  androidClientId: 'clientIdHere',
  scopes : ['profile', 'email'],
  permissions: ['public_profile', 'email','gender','location']
}

const signInWithGoogle = async () => {
  await signInWithGoogle.logInAsync(config).then(async (logInResult) => {
    if (logInResult.type === 'success') {
      //login
    }
  })
}
export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={{
      user: { 
        uid: '123321_idTest',
        displayName:'Matheus Aragão',
        photoURL: 'https://instagram.frec23-1.fna.fbcdn.net/v/t51.2885-19/288475390_693296685092013_1905504539709080227_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.frec23-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=_W0PqnmzhbAAX-8ciIf&tn=Jeh1JqqeXFBc3hTI&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAHSVm9CYrpDaZVleOL0PxOViqXKsAEFmhjyjc-0yzXVQ&oe=638F0239&_nc_sid=8fd12b'

      },
      loading:false,
      error: false,
      logout: () => console.log('logout'),
      signInWithGoogle: () => console.log('signInWithGoogle')
    }} >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}