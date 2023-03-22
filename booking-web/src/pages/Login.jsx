import React, { useState }from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { endpoint } from '../utils/utils'

import '../styles/forms.css'

const Login = () => {

  const navigate = useNavigate();

  const [ user, setUser ] = useState({
    email: '',
    password: ''
  })

  const [ error, setError ] = useState('')

  const handleResponse = (response) => {
    if (response.status === 200) {
      alert('Ingreso exitoso!')
      localStorage.setItem(
        'token', response.data.token)
      navigate('/')
    } else if (response.status === 401) {
      setError('Credenciales invalidas. Por favor, intente nuevamente.')
    } else {
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
      alert('Se deben completar todos los campos')
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
        {error.length > 0 && <p className='error'>{error}</p>}
        <button type='submit'>Ingresar</button>
        <div className='changeForm'>
          <p>¿Aún no tienes cuenta?</p>
          <Link to='/signup'>Registrarse</Link>
        </div>
      </form>
    </>
  )
}

export default Login