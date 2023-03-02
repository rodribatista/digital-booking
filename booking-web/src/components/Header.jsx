import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/images/logo.svg'
import nav from '../assets/icons/nav_mobile.svg'
import close from '../assets/icons/x_mark.svg'

import '../styles/header.css'

const Header = () => {

  const [showNav, setShowNav] = useState(false)

  const handleCloseNav = () => {
    setShowNav(false)
  }

  return (
    <header>
      <Link to='/' className='logo'>
        <img src={logo} alt="Logo Digital Booking"/>
      </Link>
      <button className='onMobile' onClick={() => setShowNav(true)}>
        <img src={nav} alt="Logo Digital Booking"/>
      </button>
      <nav className='onDesktop'>
        <ul>
          <Link to='/login'>
            <li>Iniciar Sesión</li>
          </Link>
          <Link to='/signup'>
            <li>Crear Cuenta</li>
          </Link>
        </ul>
      </nav>
      {showNav &&
        <nav className='onMobile mobileNav'>
          <button className='onMobile' onClick={handleCloseNav}>
            <img src={close} alt="Logo Digital Booking"/>
          </button>
          <ul>
            <Link to='/login' onClick={handleCloseNav}>
              <li>Iniciar Sesión</li>
            </Link>
            <Link to='/signup' onClick={handleCloseNav}>
              <li>Crear Cuenta</li>
            </Link>
          </ul>
        </nav>
      }
    </header>
  )
}

export default Header