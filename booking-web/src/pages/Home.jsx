import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { endpoint } from '../utils/utils'

import SearchBar from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'

import '../styles/home.css'

const Home = () => {

  const [ products, setProducts ] = useState()
  const [ categories, setCategories ] = useState()

  useEffect(() => {
    axios.get(`${endpoint}/products`)
    .then(response => {
      setProducts(response.data)})
    .catch(e => {
      console.log(e);
    })
  }, [])

  useEffect(() => {
    axios.get(`${endpoint}/categories`)
    .then(response => {
      setCategories(response.data)})
    .catch(e => {
      console.log(e);
    })
  }, [])

  return (
    <>
    <SearchBar/>
    <section className='categories'>
      <h2>Buscar por tipo de alojamiento</h2>
      <div className='categories-grid'>
        {categories?.slice(0,4).map(
          category =>
            <Link key={category.id} to={`/categories/${category.title}`}>
              <CategoryCard key={category.id} category={category}/>
            </Link>
        )}
      </div>
    </section>
    <section className='recomendations'>
      <h2>Recomendaciones</h2>
      <div className='recomendations-grid'>
        {products?.map(
          product => <ProductCard key={product.id} product={product}/>
        )}
      </div>
    </section>
    </>
  )
}

export default Home