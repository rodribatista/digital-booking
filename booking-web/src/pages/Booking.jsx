import React from 'react'
import { useLocation } from 'react-router-dom'

import ProductHeader from '../components/product/ProductHeader'

import '../styles/booking.css'

const Booking = () => {

  const { state } = useLocation()
  console.log(state.product)

  return (
    <div className='bookingPage'>

      <ProductHeader product={state.product}/>

    </div>
  )
}

export default Booking