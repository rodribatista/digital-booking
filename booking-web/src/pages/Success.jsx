import React from 'react'
import { useNavigate } from 'react-router-dom'

import success from '../assets/icons/success.svg'

import '../styles/success.css'

const Success = () => {
  const navigate = useNavigate()
  return (
    <main>
      <div className='successMsg'>
        <img src={success} alt="Success"/>
        <div>
          <h1>¡Muchas gracias!</h1>
          <h3>Su reserva se ha realizado con éxito</h3>
        </div>
        <button onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </main>
  )
}

export default Success