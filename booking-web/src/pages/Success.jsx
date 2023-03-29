import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import success from '../assets/icons/success.svg'

import '../styles/success.css'

const Success = () => {

  const { state } = useLocation()
  const navigate = useNavigate()

  console.log(state)

  const [ message, setMessage ] = useState('')

  useEffect(() => {
    if (state.from === 'booking') {
      setMessage("Su reserva se ha realizado con éxito")
    } else if (state.from === 'adminProduct') {
      setMessage("Su propiedad se ha creado con éxito")
    }
  }, [])
  
  return (
    <main>
      <div className='successMsg'>
        <img src={success} alt="Success"/>
        <div>
          <h1>¡Muchas gracias!</h1>
          <h3>{message}</h3>
        </div>
        <button onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </main>
  )
}

export default Success