import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { endpoint } from '../utils/utils'

import '../styles/filterProducts.css'

const FilterProducts = ({type}) => {

  const params = useParams()
  
  const [ productsList, setProductsList ] = useState([])
  const [ idToSearch, setIdToSearch ] = useState(0)

  useEffect(() => {
    axios.get(`${endpoint}/${type === 'city' ? 'cities/name' : 'categories/title'}=${params.value}`)
    .then(response => {
      setIdToSearch(response.data.id)})
    .catch(e => {
      console.log(e);
    })
  })

  useEffect(() => {
    if (idToSearch !== 0) {
      axios.get(`${endpoint}/products/filter/${type}=${idToSearch}`)
      .then(response => {
        setProductsList(response.data)})
      .catch(e => {
        console.log(e);
      })
    }
  }, [type, idToSearch])
  
  return (
    <section className='filterProducts'>
      <h2>Resultados para {params.value}</h2>
      <div className='filterProducts-grid'>
        {productsList?.map(
          product => <ProductCard key={product.id} product={product}/>
        )}
      </div>
    </section>
  )
}

export default FilterProducts