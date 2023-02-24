import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { showSignupErrors } from '../utils/signupValidations'

import '../styles/forms.css'

const Signup = () => {

  const navigate = useNavigate();

  const [ user, setUser ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [ errors, setErrors ] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    let errorsArray = showSignupErrors(
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.confirmPassword
    )
    if (errorsArray.length > 0) {
      setErrors(errorsArray)
    } else if (errorsArray.length === 0) {
      alert('¡Registro exitoso!')
      navigate('/login')
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
          <label htmlFor='firstName'>Nombre</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            placeholder='John'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='lastName'>Apellido</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Doe'
            onChange={handleChange}
          />
        </div>
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
        <div>
          <label htmlFor='confirmPassword'>Confirmar contraseña</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='******'
            onChange={handleChange}
          />
        </div>
        <div className='errors'>
          {errors.map((error, index) => <p key={index}>{error}</p>)}
        </div>
        <button type='submit'>Crear cuenta</button>
        <div className='changeForm'>
          <p>¿Ya tienes una cuenta?</p>
          <Link to='/login'>Iniciar sesión</Link>
        </div>
      </form>
    </>
  )
}

export default Signup