import React from 'react'
import { Link } from 'react-router-dom'

import close from '../../assets/icons/x_mark.svg'
import facebook from '../../assets/icons/social_fb.svg'
import instagram from '../../assets/icons/social_ig.svg'
import twitter from '../../assets/icons/social_tw.svg'
import linkedin from '../../assets/icons/social_lk.svg'

import '../../styles/mobileNav.css'

const MobileNav = ({userInfo, handleCloseNav, handleLogOut}) => {
  return (
    <nav className="mobileNav onMobile">
      <div className='mobileNav-header'>
        <img src={close} alt="Logo Digital Booking"
          className="navMobileIcon" onClick={handleCloseNav}/>
          {userInfo ? (
            <div className='userLog'>
              <div className='userProfile'>
                {userInfo.firstName[0].toUpperCase()+
                userInfo.lastName[0].toUpperCase()}
              </div>
              <div>
                <h4>Hola,</h4>
                <h3>{`${userInfo.firstName} ${userInfo.lastName}`}</h3>
              </div>
            </div>
          ) : (
            <h3>MENU</h3>
          )}
      </div>
      <div className='mobileNav-main'>
        {!userInfo && (
          <nav>
            <Link to="/login" onClick={handleCloseNav}>
              Iniciar Sesión</Link>
            <Link to="/signup" onClick={handleCloseNav}>
              Crear Cuenta</Link>
          </nav>
        )}
        {userInfo && (
          <p className='closeLog'>
            ¿Deseas<span onClick={handleLogOut}> cerrar sesión</span>?
          </p>
        )}
      </div>
      <div className='mobileNav-footer'>
        <Link to='/'>
          <img src={facebook} alt="" />
        </Link>
        <Link to='/'>
          <img src={instagram} alt="" />
        </Link>
        <Link to='/'>
          <img src={twitter} alt="" />
        </Link>
        <Link to='/'>
          <img src={linkedin} alt="" />
        </Link>
      </div>
    </nav>
  )
}

export default MobileNav