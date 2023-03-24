import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext }  from '../../hooks/userContext'

import logo from '../../assets/images/logo.svg'
import nav from '../../assets/icons/nav_mobile.svg'
import close from '../../assets/icons/x_mark.svg'

import '../../styles/header.css'

const Header = () => {

  const { userInfo, setUserInfo, fetchUserInfo } = useContext(UserContext)
  const [ showNav, setShowNav ] = useState(false)
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUserInfo()
    } else {
      setUserInfo(null)
    }})

  const handleCloseNav = () => {
    setShowNav(false)}

  const handleLogOut = () => {
    localStorage.removeItem('token')
    alert('Cierre de sesión exitoso!')
  }

  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo Digital Booking" />
      </Link>
      <button className="onMobile" onClick={() => setShowNav(true)}>
        <img src={nav} alt="Logo Digital Booking" />
      </button>
      {!userInfo && (
        <nav className="onDesktop">
          <ul>
            <Link to="/login">
              <li>Iniciar Sesión</li>
            </Link>
            <Link to="/signup">
              <li>Crear Cuenta</li>
            </Link>
          </ul>
        </nav>
      )}
      {userInfo && (
        <div className="onDesktop">
          <div className="userLog">
            <p>
              Hola, <span>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
            </p>
            <button className="closeLog" onClick={handleLogOut}>
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
      {showNav && (
        <nav className="onMobile mobileNav">
          <div>
            <button className="onMobile" onClick={handleCloseNav}>
              <img src={close} alt="Logo Digital Booking" />
            </button>
            {userInfo ? (
              <h3>
                Hola, <span>{`${userInfo.firstName} ${userInfo.lastName}`}</span>
              </h3>
            ) : (
              <h3>MENU</h3>
            )}
          </div>
          {!userInfo && (
            <ul>
              <Link to="/login" onClick={handleCloseNav}>
                <li>Iniciar Sesión</li>
              </Link>
              <Link to="/signup" onClick={handleCloseNav}>
                <li>Crear Cuenta</li>
              </Link>
            </ul>
          )}
          {userInfo && (
            <button className="closeLog" onClick={handleLogOut}>
              Cerrar sesión
            </button>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header