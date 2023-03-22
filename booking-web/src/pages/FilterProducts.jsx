import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { endpoint } from '../utils/utils'

import ProductCard from '../components/ProductCard'

import '../styles/filterProducts.css'


const FilterProducts = ({type}) => {

  const { value } = useParams()
  const { state } = useLocation()

  const { response, error, loading } = useFetch(
      `${endpoint}/products/filter/${type}=${state.id}`)

  return (
    <>
      {loading && <h2>Cargando datos...</h2>}
      {error && <h2>{error.message}</h2>}
      {response != null &&
        <section className='filterProducts'>
          <h2>Resultados para {value}</h2>
          <div className='filterProducts-grid'>
            {response.length > 0 ? response?.map(
              product => <ProductCard key={product.id} product={product}/>
            ) : <p>No hay resultados para esta búsqueda</p>}
          </div>
        </section>
      }
    </>
  )
}

export default FilterProducts