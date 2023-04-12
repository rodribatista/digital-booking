import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext }  from '../../hooks/userContext'
import toast, { Toaster } from 'react-hot-toast'

import MobileNav from './MobileNav'

import logo from '../../assets/images/logo.svg'
import nav from '../../assets/icons/nav_mobile.svg'
import exit from '../../assets/icons/exit.svg'

import '../../styles/header.css'

const Header = () => {

  const { userInfo } = useUserContext()
  const [ showMobileNav, setShowMobileNav ] = useState(false)

  const handleCloseNav = () => {
    setShowMobileNav(false)}

  const handleLogOut = () => {
    localStorage.removeItem('token')
    if (!localStorage.getItem('token')) {
      toast.success('Se ha cerrado su sesión con éxito. Aguarde un momento...')
    setTimeout(() => {
      window.location.reload()
    }, 1500)
    }
  }

  return (
    <header>
      <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            duration: 4000
          }}/>
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
          {userInfo.role.title === 'ADMIN' && 
            <Link to="/admin" className='userRole'>
              Administración
            </Link>}
          {userInfo.role.title === 'USER' && 
            <Link to="/profile" className='userRole'>
              Mi perfil
            </Link>}
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