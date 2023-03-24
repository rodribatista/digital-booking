import React from 'react'

export const UserContext = React.createContext()

export const UserProvider = ({ children }) => {

  const [userInfo, setUserInfo] = React.useState(null)

  const fetchUserInfo = () => {
    setUserInfo({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com'
    })
  }

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext)