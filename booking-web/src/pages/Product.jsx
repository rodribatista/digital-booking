import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { endpoint } from '../utils/utils'
import axios from 'axios'

import goback from '../assets/icons/atomo_back.svg'
import pointer from '../assets/icons/pointer_solid.svg'

import feature_1 from '../assets/icons/features/feature_1.svg'

import '../styles/product.css'

const Product = () => {

  const { id } = useParams()

  const [ product, setProduct ] = useState()

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
              <h2>{product.category.title.toUpperCase()}</h2>
              <h1>{product.title}</h1>
            </div>
            <img src={goback} alt="Flecha para volver atras" />
          </section>
          <section className='productLocation'>
            <img src={pointer} alt="Icono de ubicación" />
            <h3>{`${product.address.street} 
            ${product.address.number} - 
            ${product.address.city.name}, 
            ${product.address.city.country.name}`}</h3>
          </section>
          <section className='productDescription'>
            <p>{product.description}</p>
          </section>
          <section className='productFeatures'>
            <ul>
              {product.features.map(feature => (
                <li key={feature.id}>
                  <img src={feature_1} alt="" />
                  <h4>{feature.title}</h4>
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