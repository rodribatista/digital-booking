import React from 'react'
import { Link } from 'react-router-dom'

import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'

import '../styles/home.css'

const categories = [
  {
    id: 1,
    title: "Hoteles",
    description: "",
    urlImage: "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o="
  },
  {
    id: 2,
    title: "Hostels",
    description: "",
    urlImage: "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o="
  },
  {
    id: 3,
    title: "Departamentos",
    description: "",
    urlImage: "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/119467716.jpeg?k=63b69100225782d08fbd4d0205bf949c0be894ab946a0366edb8ad48e9c0ef46&o="
  },
  {
    id: 4,
    title: "Bed and breakfast",
    description: "",
    urlImage: "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/100235855.jpeg?k=61ef6692e05b5971e2e8dc75687f844e6d0ad295a9a5ace17f7c713f167e61b5&o="
  },
  {
    id: 5,
    title: "No renderizar",
    description: "",
    urlImage: "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o="
  }
]

const products = [
  {
    id: 1,
    category: 'HOTEL',
    name: 'Hermitage Hotel',
    location: '940 m del centro',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    urlImage: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 2,
    category: 'HOTEL',
    name: 'Hermitage Hotel',
    location: '940 m del centro',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    urlImage: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 3,
    category: 'HOTEL',
    name: 'Hermitage Hotel',
    location: '940 m del centro',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    urlImage: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  },
  {
    id: 4,
    category: 'HOTEL',
    name: 'Hermitage Hotel',
    location: '940 m del centro',
    description: 'En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires. con 2 impresionantes piscinas, una en la terraza y otra al aire libre; habitaciones privadas.',
    urlImage: 'https://73cc8915eb9cf66dad90-91c9e0dc61e2af367a83ca09fafb7723.ssl.cf1.rackcdn.com/responsive/Native/1200px/u/Deluxe-Bedrooms.jpg'
  }
]

const Home = () => {
  return (
    <>
    <section className='categories'>
      <h2>Buscar por tipo de alojamiento</h2>
      <div className='categories-grid'>
        {categories.slice(0,4).map(
          category => <Link to="/"><CategoryCard key={category.id} category={category}/></Link>
        )}
      </div>
    </section>
    <section className='recomendations'>
      <h2>Recomendaciones</h2>
      <div className='recomendations-grid'>
        {products.map(
          product => <ProductCard key={product.id} product={product}/>
        )}
      </div>
    </section>
    </>
  )
}

export default Home