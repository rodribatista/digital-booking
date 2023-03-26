import React from 'react'
import { useNavigate } from 'react-router-dom'

import goback from '../../assets/icons/atomo_back.svg'

const ProductHeader = ({product}) => {
  const navigate = useNavigate()
  return (
    <section className='productHeader'>
      <div>
        <h4>{product.category.title.toUpperCase()}</h4>
        <h1>{product.title}</h1>
      </div>
      <img src={goback} alt="Flecha para volver atras"
        onClick={() => navigate(-1)}/>
    </section>
  )
}

export default ProductHeader