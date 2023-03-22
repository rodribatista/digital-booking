import React, { useState, useEffect }from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/general/Header'
import Footer from '../components/general/Footer'

const General = () => {

  const userLogued = localStorage.getItem('token') ? true : false
  const [ userInfo, setUserInfo ] = useState()

  useEffect(() => {
    if (userLogued) {
      setUserInfo('John Doe')}
    else {
      setUserInfo('No hay información del usuario')}
  }, [userLogued])
  
  return (
    <>
      <Header
        userLogued={userLogued} userInfo={userInfo}/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default General