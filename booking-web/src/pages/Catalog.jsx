import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { endpoint } from '../utils/utils'

import ProductCard from '../components/general/ProductCard'
import SkeletonProductCard from '../components/skeleton/SkeletonProductCard'

const Catalog = ({type}) => {

  const params = useParams()

  const { state } = useLocation()

  const [ filter, setFilter ] = useState('')

  const [ urlFetch, setUrlFetch ] = useState('')

  const handleDate = (date) => {
    return date.split("-").reverse().join("-")
  }

  useEffect(() => {
    switch (type) {
      case 'city':
        setFilter(`${params.value}`)
        setUrlFetch(`${endpoint}/products/filter/city=${state?.id}`)
        break
      case 'category':
        setFilter(`${params.value}`)
        setUrlFetch(`${endpoint}/products/filter/category=${state?.id}`)
        break
      case 'booking':
        setFilter(`${params.checkIn} al ${params.checkOut}`)
        setUrlFetch(`${endpoint}/products/filter/checkIn=${handleDate(params.checkIn)}/checkOut=${handleDate(params.checkOut)}`)
        break
      case 'bookingCity':
        setFilter(`${params.checkIn} al ${params.checkOut} en ${params.value}`)
        setUrlFetch(`${endpoint}/products/filter/checkIn=${handleDate(params.checkIn)}/checkOut=${handleDate(params.checkOut)}/city=${state?.id}`)
        break
      default:
        setFilter(`Se ha producido un error inesperado.`)
        break
    }
  }, [])

  const { response, error, loading } = useFetch(urlFetch)
  
  return (
    <main>
      <section className='container products'>
      {loading && 
        <>
          <h2>Cargando resultados...</h2>
          <div className='products-grid'>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        </>
      }
      {/* error && <h2>{error.message}</h2> */}
      {response != null &&
        <>
          <h2>Resultados para {filter}</h2>
          <div className='products-grid'>
            {response?.length > 0 ? response?.map(
              product => <ProductCard key={product.id} product={product}/>
            ) : <p>No hay resultados para esta búsqueda</p>}
          </div>
        </>
      }
      </section>
    </main>
  )
}

export default Catalog