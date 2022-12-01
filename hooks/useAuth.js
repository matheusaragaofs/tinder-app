import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'


const AuthContext = createContext({//initial state of context...
})

export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={{
      user:'matheus'
    }} >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}