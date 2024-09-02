import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { AuthContext } from './index'


export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    const unsub =  onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    return () => {
      unsub()
    }
  }, [])
  return (
    <AuthContext.Provider value={{currentUser}}>
    {children}
  </AuthContext.Provider>
  )
}