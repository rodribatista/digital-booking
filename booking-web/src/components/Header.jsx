import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/images/logo.svg'
import menu from '../assets/icons/menu.svg'

import '../styles/header.css'

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <img src={logo} alt="Logo Digital Booking"/>
      </Link>
      <Link to='/' className='onMobile'>
        <img src={menu} alt="Logo Digital Booking"/>
      </Link>
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
    </header>
  )
}

export default Header