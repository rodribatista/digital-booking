import React, { useState } from 'react'
import { useUserContext } from '../../hooks/userContext'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { endpoint } from '../../utils/utils'

import {
  validateFirstAndLastName,
  validateEmail,
  validatePassword,
  comparePasswords
} from '../../utils/signupValidations'

const UserProfile = () => {

  const { userInfo, fetchUserInfo } = useUserContext()

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  })

  const [user, setUser] = useState({
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    email: userInfo?.email,
    password: null,
    confirmPassword: null
  })

  const handleChange = (target) => {
    setUser({
      ...user,
      [target.name]: target.value.trim()
    })
    setErrors({ ...errors, [target.name]: false })
  }

  const handleError = (target) => {
    setUser({
      ...user,
      [target.name]: target.value.trim()
    })
    setErrors({ ...errors, [target.name]: true })
  }

  const handleResponse = (response, message) => {
    if (response.status === 200) {
      toast.success(message, {
        id: 'successUpdate',
      })
    } else {
      toast.error(response.data)
    }
  }

  const handleSubmitData = (e) => {
    e.preventDefault()
    if (!errors.firstName && !errors.lastName) {
      axios.put(`${endpoint}/users`,
      { firstName: user.firstName,
        lastName: user.lastName },
      { headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
      .then((response) => {
        fetchUserInfo(localStorage.getItem('token'))
        handleResponse(response,
          'Actualización exitosa de tus datos personales')})
      .catch(error =>
        handleResponse(error.response, ''))
    } else {
      toast.error('Hay errores en los campos de datos personales', {
        id: 'errorData',
      })
    }
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    if (!errors.email) {
      let config = {
        method: 'put',
        url: `${endpoint}/users/email`,
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(user.email)
      }
      axios.request(config)
      .then((response) => {
        localStorage.removeItem('token')
        handleResponse(response,
          'Actualización exitosa de email. Por favor, inicia sesión nuevamente')
        setTimeout(() =>
          window.location.reload(), 2000)})
      .catch(error =>
        handleResponse(error.response, ''))
    } else {
      toast.error('Hay errores en el campo de email', {
        id: 'errorEmail',
      })
    }
  }

  const handleSubmitPass = (e) => {
    e.preventDefault()
    if (user.password && user.confirmPassword) {
      if (!errors.password && !errors.confirmPassword) {
        let config = {
          method: 'put',
          url: `${endpoint}/users/password`,
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          data : JSON.stringify(user.confirmPassword)
        }
        axios.request(config)
        .then((response) => {
          localStorage.removeItem('token')
          handleResponse(response,
            'Actualización exitosa de la contraseña. Por favor, inicia sesión nuevamente')
          setTimeout(() =>
            window.location.reload(), 2000)})
        .catch(error =>
          handleResponse(error.response, ''))
      } else {
        toast.error('Hay errores en los campos de la contraseña', {
          id: 'errorPassword',
        })
      }
    } else {
      toast.error('Debes completar todos los campos de la contraseña', {
        id: 'noPassword',
      })
    }
  }

  return (
    <div className="bookingUser"
      style={{width: '100%'}}>

      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 3000
        }}/>

      <form onSubmit={handleSubmitData}>
        <div>
          <label htmlFor="firstName">Nombre</label>
          <input
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={
              (e) => validateFirstAndLastName(e.target.value)
              ? handleChange(e.target) : handleError(e.target)
            }
          />
          {errors.firstName && <error className='error'>Debes ingresar un nombre válido</error>}
        </div>
        <div>
          <label htmlFor="lastName">Apellido</label>
          <input
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={
              (e) => validateFirstAndLastName(e.target.value)
              ? handleChange(e.target) : handleError(e.target)
            }
          />
          {errors.lastName && <error className='error'>Debes ingresar un apellido válido</error>}
        </div>
        <div></div>
        <button
          style={{alignSelf: 'end', justifySelf: 'flex-end'}}>Actualizar datos</button>
      </form>

      <form onSubmit={handleSubmitEmail}>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={
              (e) => validateEmail(e.target.value)
              ? handleChange(e.target) : handleError(e.target)
            }
          />
          {errors.email && <error className='error'>Debes ingresar un correo válido</error>}
        </div>
        <button
          style={{alignSelf: 'end', justifySelf: 'flex-end'}}>Actualizar email</button>
      </form>

      <form onSubmit={handleSubmitPass}>
        <div>
          <label htmlFor='password'>Nueva contraseña</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='******'
            onChange={
              (e) => validatePassword(e.target.value)
              ? handleChange(e.target) : handleError(e.target)
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
              ? handleChange(e.target) : handleError(e.target)
            }
          />
          {errors.confirmPassword && <error className='error'>Ambas contraseñas deben ser iguales</error>}
        </div>
        <div></div>
        <button
          style={{alignSelf: 'end', justifySelf: 'flex-end'}}>Actualizar contraseña</button>
      </form>

    </div>
  )
}

export default UserProfile