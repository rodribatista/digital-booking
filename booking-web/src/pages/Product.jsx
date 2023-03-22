import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { endpoint } from '../utils/utils'
import { getIcon } from '../utils/iconsFeatures'

import Carousel from '../components/product/Carousel'
import SlideGallery from '../components/product/SlideGallery'

import pointer from '../assets/icons/pointer_solid.svg'

import '../styles/product.css'
import ProductHeader from '../components/product/ProductHeader'

const Product = () => {

  const { state } = useLocation()

  const { response, error, loading } = useFetch(
    `${endpoint}/products/${state.id}`)

  const [ showCarousel, setShowCarousel ] = useState(false)

  return (
    <>
      {loading && <h2>Cargando datos...</h2>}
      {error && <h2>{error.message}</h2>}
      {response != null &&
        <div className='productPage'>

          <ProductHeader product={response}/>

          <section className='productLocation'>
            <img src={pointer} alt="Icono de ubicación" />
            <h4>{`${response.address.street} 
            ${response.address.number} - 
            ${response.address.city.name}, 
            ${response.address.city.country.name}`}</h4>
          </section>

          <SlideGallery className='onMobile'
            images={response.images}/>
          <div className='productGallery'>
            <img src={response.images[0].url} alt="" />
            <div className='grid'>
              {response.images.slice(1,5).map(
                image => <img src={image.url} alt="" key={image.id}/>)}
            </div>
            <p onClick={() => setShowCarousel(true)}>Ver galería</p>
          </div>
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
                  <img src={getIcon(feature.id)} alt="" />
                  <h5>{feature.title}</h5>
                </li>
                ))}
            </ul>
          </section>

        </div>
      }
    </>
  )
}

export default Product