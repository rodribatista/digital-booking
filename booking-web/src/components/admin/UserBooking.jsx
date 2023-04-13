import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { endpoint } from '../../utils/utils'

import pointer from '../../assets/icons/pointer_solid.svg'

const UserBooking = ({bookings, fetchBookings}) => {

  const handleResponse = (response) => {
    if (response.status === 200) {
      toast.success('La reserva ha sido eliminada con éxito', {
        id: 'successDeleteBookings',
      })
      fetchBookings()
    } else {
      toast.error(response.data)
    }
  }

  const handleDelete = (id) => {
    axios.delete(`${endpoint}/bookings/${id}`,
    { headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` }})
    .then(res => {
      handleResponse(res)
    })
    .catch(err => {
      handleResponse(err.response)
    })
  }

  return (
    <main style={{padding: '0'}}>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 3000
        }}/>
      <div className='bookings-grid'>
        {bookings ?
          bookings.map(booking =>
            <section className='bookingInfo'
              style={{width: '100%'}}>
              <div>
                <img src={booking.product.images[0].url} alt="" 
                  className='productCardImage'/>
                <div className='bookingInfoContainer'>
                  <div className='productCardInfo'>
                    <div>
                      <h4>{booking.product.category.title.toUpperCase()}</h4>
                      <h2>{booking.product.title}</h2>
                    </div>
                    <div className='productCardLocation'>
                      <img src={pointer} alt="" className='icons'/>
                      <p>{`${booking.product.address.city.name}, ${booking.product.address.city.country.name}`}</p>
                    </div>
                  </div>
                  <div className='bookingInfoDates'>
                    <div>
                      <p>Check in</p>
                      <h3>{booking.dateCheckIn}</h3>
                    </div>
                    <div>
                      <p>Check out</p>
                      <h3>{booking.dateCheckOut}</h3>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(booking.id)}
                    style={{
                      width: '200px',
                      backgroundColor: '#B00020'
                    }}>
                    Eliminar</button>
                </div>
              </div>
            </section>
          ) :
            <>
              <p>Todavía no has realizado ninguna reserva</p>
            </>
        }
      </div>
    </main>
  )
}

export default UserBooking