import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { endpoint } from '../utils/utils'

import SearchBar from '../components/general/SearchBar'
import CategoryCard from '../components/general/CategoryCard'
import ProductCard from '../components/general/ProductCard'
import SkeletonCategory from '../components/skeleton/SkeletonCategory'
import SkeletonProductCard from '../components/skeleton/SkeletonProductCard'

import '../styles/home.css'


const Home = () => {
  
  const categories = useFetch(`${endpoint}/categories`)
  const products = useFetch(`${endpoint}/products/random`)

  return (
    <>
      <SearchBar/>
      <main>
        <section className='container categories'>
          <h2>Buscar por tipo de alojamiento</h2>
          <div className='categories-grid'>
            {categories.loading &&
              <>
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCategory key={index} />
              ))}
              </>
            }
            {categories.response?.slice(0,4).map(
              category =>
                <Link key={category.id} to={`/products/category/${category.title}`}
                  state={{ id: category.id }}>
                  <CategoryCard key={category.id} category={category}/>
                </Link>
            )}
          </div>       
        </section>
        <section className='container products'>
          <h2>Recomendaciones</h2>
          <div className='products-grid'>
            {products.loading &&
              <>
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonProductCard key={index} />
              ))}
              </>
            }
            {products.response?.map(
              product => <ProductCard key={product.id} product={product}/>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default Home