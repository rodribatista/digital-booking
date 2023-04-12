import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext }  from '../hooks/userContext'

import UserProfile from '../components/admin/UserProfile'
import UserBooking from '../components/admin/UserBooking'

import goback from '../assets/icons/atomo_back.svg'

import '../styles/admin.css'

const Admin = () => {

  const { userInfo } = useUserContext()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    if (userInfo && userInfo.role !== 'user') {
      navigate('/')}
  }}, [])

  const [showProfile, setShowProfile] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  return (
    <>
      <div className='adminHeader'>
        <h1>Mi perfil</h1>
        <img src={goback} alt="Flecha para volver atras"
          onClick={() => navigate(-1)}/>
      </div>
      <main className='adminPage'>
          <section className='adminSection'>
            <h2>Mis datos</h2>
            <button alt="Boton para mostrar formulario para editar datos del usuario"
              onClick={() => {
                setShowBooking(false)
                setShowProfile(!showProfile)}}>
                {showProfile ? 'Ocultar' : 'Mostrar'}
              </button>
          </section>
          {showProfile && <UserProfile/>}
          <section className='adminSection'>
            <h2>Mis reservas</h2>
            <button alt="Boton para mostrar una lista de las reservas realizadas"
              onClick={() => {
                setShowProfile(false)
                setShowBooking(!showBooking)}}>
                {showBooking ? 'Ocultar' : 'Mostrar'}
              </button>
          </section>
          {showBooking && <UserBooking/>}
      </main>
    </>
  )
}

export default Admin