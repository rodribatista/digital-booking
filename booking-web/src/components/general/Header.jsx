import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext }  from '../../hooks/userContext'

import MobileNav from './MobileNav'

import logo from '../../assets/images/logo.svg'
import nav from '../../assets/icons/nav_mobile.svg'
import exit from '../../assets/icons/exit.svg'

import '../../styles/header.css'

const Header = () => {

  const { userInfo, setUserInfo, fetchUserInfo } = useContext(UserContext)
  const [ showMobileNav, setShowMobileNav ] = useState(false)
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUserInfo()
    } else {
      setUserInfo(null)
    }})

  const handleCloseNav = () => {
    setShowMobileNav(false)}

  const handleLogOut = () => {
    localStorage.removeItem('token')
    alert('Cierre de sesión exitoso!')
  }

  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo Digital Booking" />
      </Link>
      <img src={nav} alt="Logo Digital Booking"
        className='onMobile navMobileIcon' onClick={() => setShowMobileNav(true)}/>

      {showMobileNav && (
        <MobileNav
          userInfo={userInfo}
          handleCloseNav={handleCloseNav}
          handleLogOut={handleLogOut}/>
      )}

      {!userInfo && (
        <nav className='desktopNav onTablet onDesktop'>
          <Link to="/login">
            Iniciar Sesión
          </Link>
          <Link to="/signup">
            Crear Cuenta
          </Link>
        </nav>
      )}
      {userInfo && (
        <div className='onTablet onDesktop userLog'>
          <div className='userProfile'>
            {userInfo.firstName[0].toUpperCase()+
            userInfo.lastName[0].toUpperCase()}
          </div>
          <div>
            <h4>Hola,</h4>
            <h3>{`${userInfo.firstName} ${userInfo.lastName}`}</h3>
          </div>
          <img src={exit} alt="close session"
            onClick={handleLogOut}/>
        </div>
      )}
    </header>
  )
}

export default Header