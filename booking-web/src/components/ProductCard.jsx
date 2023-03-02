import React from 'react'

import fav from '../assets/icons/heart_fav.svg'
import pointer from '../assets/icons/pointer_solid.svg'

import '../styles/productCard.css'

const handleClick = (e) => {
  e.preventDefault()
  alert(`Ir a página de ${e.target.value}`)
}

const ProductCard = ({product}) => {
  return (
    <div className='productCard'>
      <div className='productCardImage'>
        <img className='fav' src={fav} alt="" />
        <img className='img' src={product.images} alt="" />
      </div>
      <div className='productCardInfo'>
        <div>
          <h2>{product.category.toUpperCase()}</h2>
          <h1>{product.name}</h1>
        </div>
        <div className='productCardLocation'>
          <img src={pointer} alt="" />
          <h3>{product.location}</h3>
        </div>
        <div>
          <p>
            {product.description.length > 150 ?
              `${product.description.substring(0, 150)}...`
            : product.description}
          </p>
        </div>
        <button
          onClick={handleClick}
          value={product.name}
        >
          Ver detalle
        </button>
      </div>
    </div>
  )
}

export default ProductCard