import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { endpoint } from '../utils/utils'
import { getIcon } from '../utils/iconsFeatures'

import ProductHeader from '../components/product/ProductHeader'
import Carousel from '../components/product/Carousel'
import SlideGallery from '../components/product/SlideGallery'
import { CalendarMobile, CalendarDesktop } from '../components/product/Calendar'

import pointer from '../assets/icons/pointer_solid.svg'
import noImage from '../assets/images/no-image.png'

import '../styles/product.css'

const Product = () => {

  const navigate = useNavigate()
  const { state } = useLocation()

  const { response, error, loading } = useFetch(
    `${endpoint}/products/${state.id}`)

  const bookings = useFetch(
    `${endpoint}/bookings/filter/product=${state.id}`)

  const [ showCarousel, setShowCarousel ] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    navigate('booking',
      { state: { product: response,
        bookings: bookings.response }}
    )
  }

  return (
    <main style={{padding: '0'}}>
      <div className='productPage'>
        {loading && 
          <section>
            <h2 style={{border: 'none'}}>
              Cargando datos...</h2>
          </section>}
        {error && <h2>{error.message}</h2>}
        {response != null &&
          <>
            <ProductHeader product={response}/>

            <section className='productLocation'>
              <img src={pointer} alt="Icono de ubicación"
                className='icons'/>
              <p>{`${response.address.street} 
              ${response.address.number} - 
              ${response.address.city.name}, 
              ${response.address.city.country.name}`}</p>
            </section>

            {response.images.length > 0 ?
              <SlideGallery images={response.images}/>
            : <img src={noImage} alt=""
                className='onTablet onMobile sliderContainer'
                  style={{objectFit: 'cover'}}/>}
            
            
            {response.images.length > 0 ?
              <div className='productGallery'>
                <img src={response.images[0].url} alt="" />
                <div className='grid'>
                  {response.images.slice(1,5).map(
                    image => <img src={image.url} alt="" key={image.id}/>)}
                </div>
                <button onClick={() => setShowCarousel(true)}>Ver galería</button>
              </div>
            : <div className='productGallery'>
                <img src={noImage} alt=""/>
                <div className='grid'></div>
              </div>}
                
            {showCarousel &&
              <Carousel
                images={response.images}
                setShowCarousel={setShowCarousel}/>}

            <section className='productDescription'>
              <h2>Alojate con nosotros en {response.address.city.name}</h2>
              <p>{response.description}</p>
            </section>

            <section className='productFeatures'>
              <h2>¿Qué ofrece este lugar?</h2>
              <ul>
                {response.features.map(feature => (
                  <li key={feature.id}>
                    <img src={getIcon(feature.id)} alt=""
                      className='icons'/>
                    <p>{feature.title}</p>
                  </li>
                  ))}
              </ul>
            </section>

            <section className='productDates'>
              <h2>Fechas disponibles</h2>
              <div>
                <CalendarMobile bookings={bookings?.response}/>
                <CalendarDesktop bookings={bookings?.response}/>
                <div className='startBooking'>
                  <p>Agregá tus fechas para obtener precios exactos</p>
                  <button onClick={handleClick}>Iniciar reserva</button>
                </div>
              </div>
            </section>

        </>}
      </div>
    </main>
  )
}

export default Product