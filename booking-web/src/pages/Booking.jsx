import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import ProductHeader from '../components/product/ProductHeader'
import { CalendarMobile, CalendarDesktop } from '../components/booking/Calendar'

import calendar from '../assets/icons/calendar.svg'
import pointer from '../assets/icons/pointer_solid.svg'

import '../styles/booking.css'

const Booking = () => {

  const navigate = useNavigate()
  const { state } = useLocation()

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
                <input id="firstName" type="text" value="John" disabled/>
              </div>
              <div>
                <label htmlFor="lastName">Apellido</label>
                <input id="lastName" type="text" value="Doe" disabled/>
              </div>
              <div>
                <label htmlFor="email">Correo electrónico</label>
                <input id="email" type="text" value="john@doe.com" disabled/>
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
                <select name="selectTime" id="selectTime">
                  <option selected>Seleccionar hora de llegada</option>
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
            <CalendarMobile/>
            <CalendarDesktop/>
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
                  <h3>10/10/2023</h3>
                </div>
                <div>
                  <p>Check out</p>
                  <h3>15/10/2023</h3>
                </div>
              </div>
              <button>Confirmar reserva</button>
            </div>
          </div>
        </section>

      </div>

    </div>
  )
}

export default Booking