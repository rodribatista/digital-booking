import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../hooks/userContext'
import axios from 'axios'
import { endpoint } from '../utils/utils'

import ProductHeader from '../components/product/ProductHeader'
import { CalendarMobile, CalendarDesktop } from '../components/booking/Calendar'

import calendar from '../assets/icons/calendar.svg'
import pointer from '../assets/icons/pointer_solid.svg'

import '../styles/booking.css'

const Booking = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo } = useContext(UserContext)

  // aca tengo que controlar la navegacion para que cuando el usuario se loguee vuelva a esta pagina
  useEffect(() => {
    if (!userInfo) {
      navigate('/login',
        { state: { from: location.pathname, 
          product: location.state.product}})
  }}, [])

  const { state } = useLocation()
  
  const [arrivedTime, setArrivedTime] = useState(null)
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const handleDate = (date) => {
    return date.toLocaleDateString("es-CL")
  }

  const handleFetchDate = (date) => {
    return date.toLocaleDateString("es-CL")
      .split("-").reverse().join("-")
  }

  const handleResponse = (response) => {
    if (response.status === 201) {
      navigate('success',
        { state: { from: 'booking' }})
    } else {
      alert(response.data)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (arrivedTime && arrivedTime !== "null" 
      && startDate && endDate) {
      axios.post(`${endpoint}/bookings`, {
        "arrivedTime": arrivedTime,
        "dateCheckIn": handleFetchDate(startDate),
        "dateCheckOut": handleFetchDate(endDate),
        "product_id": state.product.id
      }, { headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
      .then((response) =>
        handleResponse(response))
      .catch(error =>
        handleResponse(error.response))
    } else {
      alert('Por favor, completa todos los campos')
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    navigate(`/products/${e.target.value}`,
      { state: { id: e.target.id }})
  }

  return (
    <div className='bookingPage'>

      <ProductHeader product={state.product}/>

      <div>

        <div className='bookingContainer'>

          <section className='bookingUser'>
            <h2>Datos del usuario</h2>
            <form>
              <div>
                <label htmlFor="firstName">Nombre</label>
                <input id="firstName" type="text" value={userInfo?.firstName} disabled/>
              </div>
              <div>
                <label htmlFor="lastName">Apellido</label>
                <input id="lastName" type="text" value={userInfo?.lastName} disabled/>
              </div>
              <div>
                <label htmlFor="email">Correo electrónico</label>
                <input id="email" type="text" value={userInfo?.email} disabled/>
              </div>
            </form>
          </section>

          <section className='bookingTime'>
            <h2>Tu horario de llegada</h2>
            <div>
              <div className='bookingTimeInfo'>
                <img src={calendar} alt="" className='icons'/>
                <p>Tu habitación va a estar lista para el <span>check-in entre las 10:00 y las 14:00 hs</span></p>
              </div>
              <form>
                <label htmlFor="selectTime">Indica tu horario estimado de llegada</label>
                <select name="selectTime" id="selectTime"
                  onChange={(e) => setArrivedTime(e.target.value)}>
                  <option value="null" selected>Seleccionar hora de llegada</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                </select>
              </form>
            </div>
          </section>

          <section className='bookingDates'>
            <h2>Fechas disponibles</h2>
            <CalendarMobile
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              bookings={state.bookings}
            />
            <CalendarDesktop
              startDate={startDate}
              endDate={endDate}
              setDateRange={setDateRange}
              bookings={state.bookings}
            />
          </section>

        </div>

        <section className='bookingInfo'>
          <h2>Detalles de la reserva</h2>
          <div>
            <img src={state.product.images[0].url} alt="" 
              className='productCardImage'/>
            <div className='bookingInfoContainer'>
              <div className='productCardInfo'>
                <div>
                  <h4>{state.product.category.title.toUpperCase()}</h4>
                  <h2>{state.product.title}</h2>
                </div>
                <div className='productCardLocation'>
                  <img src={pointer} alt="" className='icons'/>
                  <p>{`${state.product.address.city.name}, ${state.product.address.city.country.name}`}</p>
                </div>
              </div>
              <div className='bookingInfoDates'>
                <div>
                  <p>Check in</p>
                  <h3>{startDate && handleDate(startDate)}</h3>
                </div>
                <div>
                  <p>Check out</p>
                  <h3>{endDate && handleDate(endDate)}</h3>
                </div>
              </div>
              <button onClick={handleSubmit}>
                Confirmar reserva</button>
            </div>
          </div>
        </section>

      </div>

    </div>
  )
}

export default Booking