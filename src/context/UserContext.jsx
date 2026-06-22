import { useState, useEffect, createContext } from 'react'
import customFetch from '../utils/api'
import Loading from '../components/Loading'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchMe() {
      const token = localStorage.getItem("token")
        if (token) {
          try {
            const data = await customFetch("/api/auth/me")
            setUser(data.data)
          } catch (e) {
            setUser(null)
          }
        }
        setLoading(false)
     }
     fetchMe()
    }, [])
  if (isLoading) return <Loading />
  return (
    <UserContext.Provider value={{user, setUser, isLoading}}>
      {children}
    </UserContext.Provider>
  )
}