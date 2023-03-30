import React, { createContext, useContext, useEffect } from 'react'
import axios from 'axios'
import { endpoint } from '../utils/utils'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const [userInfo, setUserInfo] = React.useState(null)

  const fetchUserInfo = (token) => {
    axios.get(`${endpoint}/users`,
      { headers: {
        'Authorization': `Bearer ${token}` }})
    .then((response) =>
      setUserInfo(response.data))
    .catch(error =>
      alert(error.response))
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserInfo(token)}
  }, [])

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)