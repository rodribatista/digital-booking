import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { endpoint } from '../utils/utils'
import axios from 'axios'

import goback from '../assets/icons/atomo_back.svg'
import pointer from '../assets/icons/pointer_solid.svg'

import feature_1 from '../assets/icons/features/feature_1.svg'

import '../styles/product.css'
import Carousel from '../components/Carousel'
import SlideGallery from '../components/SlideGallery'

const Product = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [ product, setProduct ] = useState()
  const [ showCarousel, setShowCarousel ] = useState(false)

  useEffect(() => {
    axios.get(`${endpoint}/products/${id}`)
    .then(response => {
      setProduct(response.data)})
    .catch(e => {
      console.log(e);
    })
  }, [id])

  return (
    <>
      {product ?
        <div className='productPage'>
          <section className='productHeader'>
            <div>
              <h3>{product.category.title.toUpperCase()}</h3>
              <h1>{product.title}</h1>
            </div>
            <img src={goback} alt="Flecha para volver atras"
              onClick={() => navigate(-1)}/>
          </section>
          <section className='productLocation'>
            <img src={pointer} alt="Icono de ubicación" />
            <h4>{`${product.address.street} 
            ${product.address.number} - 
            ${product.address.city.name}, 
            ${product.address.city.country.name}`}</h4>
          </section>
          <SlideGallery className='onMobile'
            images={product.images}/>
          <div className='productGallery'>
            <img src={product.images[0].url} alt="" />
            <div className='grid'>
              {product.images.slice(1,5).map(
                image => <img src={image.url} alt="" key={image.id}/>)}
            </div>
            <p onClick={() => setShowCarousel(true)}>Ver más...</p>
          </div>
          {showCarousel &&
            <Carousel
              images={product.images}
              setShowCarousel={setShowCarousel}/>}
          <section className='productDescription'>
            <h2>Alojate con nosotros en {product.address.city.name}</h2>
            <p>{product.description}</p>
          </section>
          <section className='productFeatures'>
            <h2>¿Qué ofrece este lugar?</h2>
            <ul>
              {product.features.map(feature => (
                <li key={feature.id}>
                  <img src={feature_1} alt="" />
                  <h5>{feature.title}</h5>
                </li>
                ))}
            </ul>
          </section>
        </div>
      : <h2>Cargando...</h2>}
    </>
  )
}

export default Product