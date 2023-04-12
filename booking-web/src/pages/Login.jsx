import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../hooks/userContext'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { endpoint } from '../utils/utils'

import warning from '../assets/icons/warning.svg'

import '../styles/forms.css'

const Login = () => {

  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.from.includes('/booking')) {
      toast.error('Debes estar logueado para poder realizar una reserva', {
        id: 'loginError',
      })
    }
  }, [])

  const navigate = useNavigate()
  const { fetchUserInfo } = useUserContext()

  const [ user, setUser ] = useState({
    email: '',
    password: ''
  })

  const [ error, setError ] = useState('')

  const handleResponse = (response) => {
    if (response.status === 200) {
      localStorage.setItem(
        'token', response.data.token)
      fetchUserInfo(response.data.token)
      toast.success('Ingreso exitoso. Aguarde, pronto será redireccionado.')
      setTimeout(() => {
        if (location.state) {
          navigate(location.state.from, {
            state: { product: location.state.product }
          })
        } else {
          navigate('/')
        }
      }, 2000)
    } else if (response.status === 401) {
      setError('Credenciales invalidas. Intente nuevamente.')
    } else  {
      setError(response.data)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const userValues = Object.values(user)
    if (userValues.every((value) => value.length > 0)) {
      axios.post(`${endpoint}/users/auth`, user)
      .then((response) =>
        handleResponse(response))
      .catch(error =>
        handleResponse(error.response))
    } else {
      setError('Se deben completar todos los campos')
    }
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim()
    })
  }

  return (
    <>
      <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            duration: 3000
          }}/>
      <form action='' className='forms' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Correo eléctronico</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='john@mail.com'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='******'
            onChange={handleChange}
          />
        </div>
        {error.length > 0 && 
          <div className='errors'>
            <img src={warning} alt="Icon error" />
            <error>{error}</error>
          </div>}
        <button type='submit'>Ingresar</button>
        <div className='changePage'>
          <p>¿Aún no tienes cuenta?</p>
          <Link to='/signup'>Registrarse</Link>
        </div>
      </form>
    </>
  )
}

export default Login