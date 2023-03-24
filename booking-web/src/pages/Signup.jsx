import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { endpoint } from '../utils/utils'

import {
  validateFirstAndLastName,
  validateEmail,
  validatePassword,
  comparePasswords
} from '../utils/signupValidations'

import warning from '../assets/icons/warning.svg'

import '../styles/forms.css'

const Signup = () => {

  const navigate = useNavigate()

  const [ user, setUser ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  })

  const [ error, setError ] = useState('')

  const handleResponse = (response) => {
    if (response.status === 201) {
      alert('Registro exitoso!')
      navigate('/login')
    } else {
      setError(response.data)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const userValues = Object.values(user)
    if (userValues.every((value) => value.length > 0)) {
      const arrayErrors = Object.values(errors)
      if (arrayErrors.every((error) => error === false)) {
        axios.post(`${endpoint}/users/signup`, user)
        .then((response) =>
          handleResponse(response))
        .catch(error =>
          handleResponse(error.response))
      } else {
        setError('Hay errores en el formulario')
      }
    } else {
      setError('Se deben completar todos los campos')
    }
  }

  const handleChange = (name, value) => {
    setUser({...user, [name]: value.trim()})
    setErrors({ ...errors, [name]: false })
  }

  const handleError = (name, value) => {
    setUser({...user, [name]: value.trim()})
    setErrors({ ...errors, [name]: true })
  }

  return (
    <>
      <form action='' className='forms' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='firstName'>Nombre</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            placeholder='John'
            onChange={
              (e) => validateFirstAndLastName(e.target.value)
              ? handleChange(e.target.name, e.target.value)
              : handleError(e.target.name, e.target.value)
            }
          />
          {errors.firstName && <p className='error'>Debes ingresar un nombre válido</p>}
        </div>
        <div>
          <label htmlFor='lastName'>Apellido</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Doe'
            onChange={
             (e) =>  validateFirstAndLastName(e.target.value)
             ? handleChange(e.target.name, e.target.value)
             : handleError(e.target.name, e.target.value)
            }
          />
          {errors.lastName && <p className='error'>Debes ingresar un apellido válido</p>}
        </div>
        <div>
          <label htmlFor='email'>Correo eléctronico</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='john@mail.com'
            onChange={
              (e) => validateEmail(e.target.value)
              ? handleChange(e.target.name, e.target.value)
              : handleError(e.target.name, e.target.value)
            }
          />
          {errors.email && <p className='error'>Debes ingresar un correo válido</p>}
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='******'
            onChange={
              (e) => validatePassword(e.target.value)
              ? handleChange(e.target.name, e.target.value)
              : handleError(e.target.name, e.target.value)
            }
          />
          {errors.password && <p className='error'>La contraseña debe tener al menos 6 caracteres</p>}
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirmar contraseña</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='******'
            onChange={
              (e) => comparePasswords(user.password, e.target.value)
              ? handleChange(e.target.name, e.target.value)
              : handleError(e.target.name, e.target.value)
            }
          />
          {errors.confirmPassword && <p className='error'>Ambas contraseñas deben ser iguales</p>}
        </div>
        {error.length > 0 && 
          <div className='errors'>
            <img src={warning} alt="Icon error" />
            <p>{error}</p>
          </div>}
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