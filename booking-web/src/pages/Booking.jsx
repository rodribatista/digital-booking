import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import goback from '../assets/icons/atomo_back.svg'

const Booking = (data) => {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div>
      <section className='productHeader'>
            <div>
              <h3>{data.category.title.toUpperCase()}</h3>
              <h1>{data.title}</h1>
            </div>
            <img src={goback} alt="Flecha para volver atras"
              onClick={() => navigate(-1)}/>
          </section>
    </div>
  )
}

export default Booking