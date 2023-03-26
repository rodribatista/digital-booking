import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../utils/utils'
import { endpoint } from '../utils/utils'

import SearchBar from '../components/general/SearchBar'
import CategoryCard from '../components/general/CategoryCard'
import ProductCard from '../components/general/ProductCard'

import '../styles/home.css'

const categoriesData = fetchData(`${endpoint}/categories`)
const productsData = fetchData(`${endpoint}/products/random`)

const Home = () => {

  const categories = categoriesData.read()
  const products = productsData.read()

  return (
    <>
      <SearchBar/>
      <main>
        <section className='container categories'>
          <h2>Buscar por tipo de alojamiento</h2>
          <div className='categories-grid'>
            <Suspense fallback={<div>Cargando categorías...</div>}>
              {categories?.slice(0,4).map(
                category =>
                  <Link key={category.id} to={`/products/category/${category.title}`}
                    state={{ id: category.id }}>
                    <CategoryCard key={category.id} category={category}/>
                  </Link>
              )}
            </Suspense>
          </div>
        </section>
        <section className='container products'>
          <h2>Recomendaciones</h2>
          <div className='products-grid'>
            <Suspense fallback={<div>Cargando productos...</div>}>
              {products?.map(
                product => <ProductCard key={product.id} product={product}/>
              )}
            </Suspense>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home