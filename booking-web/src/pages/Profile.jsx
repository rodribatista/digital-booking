import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext }  from '../hooks/userContext'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { endpoint } from '../utils/utils'

import UserProfile from '../components/admin/UserProfile'
import UserBooking from '../components/admin/UserBooking'

import goback from '../assets/icons/atomo_back.svg'

import '../styles/admin.css'

const Admin = () => {

  const { userInfo } = useUserContext()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  
  const fetchBookings = () => {
    axios.get(`${endpoint}/bookings/filter/users`,
      { headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` }})
      .then (res =>
        setBookings(res.data))
      .catch (err =>
        toast.error('Ha ocurrido un error al cargar las reservas del usuario')
        , { id: 'errorBookings' })
  }
  useEffect(() => {
    if (userInfo && userInfo.role.title === 'USER') {
      fetchBookings()
    } else {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 3000
        }}/>
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
          {showBooking && <UserBooking
            bookings={bookings}
            fetchBookings={fetchBookings}/>}
      </main>
    </>
  )
}

export default Admin