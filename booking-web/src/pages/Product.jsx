import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { endpoint } from '../utils/utils'

import Carousel from '../components/Carousel'
import SlideGallery from '../components/SlideGallery'

import goback from '../assets/icons/atomo_back.svg'
import pointer from '../assets/icons/pointer_solid.svg'

import feature_1 from '../assets/icons/features/feature_1.svg'
import feature_2 from '../assets/icons/features/feature_2.svg'
import feature_3 from '../assets/icons/features/feature_3.svg'
import feature_4 from '../assets/icons/features/feature_4.svg'
import feature_5 from '../assets/icons/features/feature_5.svg'
import feature_6 from '../assets/icons/features/feature_6.svg'
import feature_7 from '../assets/icons/features/feature_7.svg'
import feature_8 from '../assets/icons/features/feature_8.svg'

import '../styles/product.css'

const getIcon = (feature) => {
  switch (feature) {
    case 1:
      return feature_1
    case 2:
      return feature_2
    case 3:
      return feature_3
    case 4:
      return feature_4
    case 5:
      return feature_5
    case 6:
      return feature_6
    case 7:
      return feature_7
    case 8:
      return feature_8
    default:
      break;
  }
}

const Product = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const { response, error, loading } = useFetch(`${endpoint}/products/${id}`)

  const [ showCarousel, setShowCarousel ] = useState(false)

  return (
    <>
      {loading && <h2>Cargando datos...</h2>}
      {error && <h2>{error.message}</h2>}
      {response != null &&
        <div className='productPage'>
          <section className='productHeader'>
            <div>
              <h3>{response.category.title.toUpperCase()}</h3>
              <h1>{response.title}</h1>
            </div>
            <img src={goback} alt="Flecha para volver atras"
              onClick={() => navigate(-1)}/>
          </section>
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