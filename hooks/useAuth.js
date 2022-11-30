import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'


const AuthContext = createContext({
    //initial state of context...
})

const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={null} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider