import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.svg'
import nav from '../../assets/icons/nav_mobile.svg'
import close from '../../assets/icons/x_mark.svg'

import '../../styles/header.css'

const Header = ({userLogued, userInfo}) => {

  const [ showNav, setShowNav ] = useState(false)

  const handleCloseNav = () => {
    setShowNav(false)
  }

  const handleLogOut = () => {
    localStorage.removeItem('user')
    alert('Cierre de sesión exitoso!')
  }

  return (
    <header>
      <Link to='/' className='logo'>
        <img src={logo} alt="Logo Digital Booking"/>
      </Link>
      <button className='onMobile' onClick={() => setShowNav(true)}>
        <img src={nav} alt="Logo Digital Booking"/>
      </button>
      {!userLogued && 
        <nav className='onDesktop'>
          <ul>
            <Link to='/login'>
              <li>Iniciar Sesión</li>
            </Link>
            <Link to='/signup'>
              <li>Crear Cuenta</li>
            </Link>
          </ul>
        </nav>}
      {userLogued &&
        <div className='onDesktop'>
          <div className='userLog'>
            <p>Hola, <span>{userInfo}</span></p>
            <button className='closeLog' onClick={handleLogOut}>Cerrar sesión</button>
          </div>
        </div>}
      {showNav &&
        <nav className='onMobile mobileNav'>
          <div>
            <button className='onMobile' onClick={handleCloseNav}>
              <img src={close} alt="Logo Digital Booking"/>
            </button>
            {userLogued ? 
              <h3>Hola, <span>{userInfo}</span></h3>
            : <h3>MENU</h3>}
          </div>
          {!userLogued &&
            <ul>
              <Link to='/login' onClick={handleCloseNav}>
                <li>Iniciar Sesión</li>
              </Link>
              <Link to='/signup' onClick={handleCloseNav}>
                <li>Crear Cuenta</li>
              </Link>
            </ul>}
          {userLogued &&
            <button className='closeLog' onClick={handleLogOut}>Cerrar sesión</button>}
        </nav>}
    </header>
  )
}

export default Header