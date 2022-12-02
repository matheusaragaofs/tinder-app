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
      user:false,
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