import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
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
      toast.success('Registro exitoso. Ahora puede iniciar sesión.', {
        id: 'successSignup',
      })
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
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 3000
        }}/>
      <form action='' className='forms' onSubmit={handleSubmit}>
        <div className='username'>
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
            {errors.firstName && <error className='error'>Debes ingresar un nombre válido</error>}
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
            {errors.lastName && <error className='error'>Debes ingresar un apellido válido</error>}
          </div>
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
          {errors.email && <error className='error'>Debes ingresar un correo válido</error>}
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
          {errors.password && <error className='error'>La contraseña debe tener al menos 6 caracteres</error>}
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
          {errors.confirmPassword && <error className='error'>Ambas contraseñas deben ser iguales</error>}
        </div>
        {error.length > 0 && 
          <div className='errors'>
            <img src={warning} alt="Icon error" />
            <error>{error}</error>
          </div>}
        <button type='submit'>Crear cuenta</button>
        <div className='changePage'>
          <p>¿Ya tienes una cuenta?</p>
          <Link to='/login'>Iniciar sesión</Link>
        </div>
      </form>
    </>
  )
}

export default Signup