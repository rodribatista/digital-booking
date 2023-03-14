import React, { useState }from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { loginCredentials } from '../utils/userRequests'

import '../styles/forms.css'

const Login = () => {

  const navigate = useNavigate();

  const [ user, setUser ] = useState({
    email: '',
    password: ''
  })

  const [ error, setError ] = useState({
    status: 200,
    message: ''
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const userValues = Object.values(user)
    if (userValues.every((value) => value.length > 0)) {
      const response = loginCredentials(user.email, user.password)
      if (response.status === 200) {
        localStorage.setItem('user', response.name)
        alert('¡Ingreso exitoso!')
        navigate('/')
      } else {
        setError(response)
      }
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
        {error.status !== 200 && <p className='error'>{error.message}</p>}
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