import React from 'react'
import axios from 'axios'
import { endpoint } from '../utils/utils'

export const UserContext = React.createContext()

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

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext)