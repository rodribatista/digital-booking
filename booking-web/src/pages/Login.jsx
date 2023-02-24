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

  const [ error, setError ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    let textError = loginCredentials(
      user.email,
      user.password
    )
    if (textError !== 200) {
      setError(textError)
    } else if (textError === 200) {
      alert('¡Ingreso exitoso!')
      navigate('/')
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
      <form action='' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Correo eléctronico</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='jhon@mail.com'
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
        <div className='errors'>
          {error.length > 0 && <p>{error}</p>}
        </div>
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