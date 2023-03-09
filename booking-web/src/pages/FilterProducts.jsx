import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

import '../styles/filterProducts.css'

const products = [
  {
    id: 1,
    category: 'Hoteles',
    name: 'Hermitage Hotel',
    location: 'Buenos Aires',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    images: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 2,
    category: 'Hoteles',
    name: 'Hermitage Hotel',
    location: 'Buenos Aires',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    images: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 3,
    category: 'Hoteles',
    name: 'Hermitage Hotel',
    location: 'Salta',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    images: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 4,
    category: 'Hoteles',
    name: 'Hermitage Hotel',
    location: 'Mar del Plata',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    images: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 5,
    category: 'Hostels',
    name: 'Hermitage Hotel',
    location: 'Mar del Plata',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    images: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 6,
    category: 'Hoteles',
    name: 'Hermitage Hotel',
    location: 'Mendoza',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    images: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 7,
    category: 'Hostels',
    name: 'Hermitage Hotel',
    location: 'Salta',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    images: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 8,
    category: 'Hoteles',
    name: 'Hermitage Hotel',
    location: 'Mar del Plata',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    images: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  }
]

const City = () => {

  const params = useParams()
  
  const [ productsFilter, setProductsFilter ] = useState([])

  useEffect(() => {
    params.city && setProductsFilter(products.filter(product => product.location === params.city))
    params.category && setProductsFilter(products.filter(product => product.category === params.category))
  }, [params.city, params.category])
  
  return (
    <section className='filterProducts'>
      <h2>Resultados para {params.city ? params.city : params.category}</h2>
      <div className='filterProducts-grid'>
        {productsFilter.map(
          product => <ProductCard key={product.id} product={product}/>
        )}
      </div>
    </section>
  )
}

export default City