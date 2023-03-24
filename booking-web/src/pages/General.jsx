import React from 'react'
import { Outlet } from 'react-router-dom'
import { UserProvider } from '../hooks/userContext'

import Header from '../components/general/Header'
import Footer from '../components/general/Footer'

const General = () => {
  return (
    <>
    <UserProvider>
      <Header/>
      <Outlet/>
      <Footer/>
    </UserProvider>
    </>
  )
}

export default General