import React from 'react'

import iconFav from '../assets/icons/icon-fav.svg'
import pointer from '../assets/icons/icon-pointer.svg'

import '../styles/productCard.css'

const ProductCard = ({product}) => {
  return (
    <div className='productCard'>
      <div className='imageContainer'>
        <img className='fav' src={iconFav} alt="" />
        <img className='productImage' src={product.urlImage} alt="" />
      </div>
      <div className='infoContainer'>
        <div>
          <h2>{product.category}</h2>
          <h1>{product.name}</h1>
        </div>
        <div className='infoLocation'>
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
        <button>Ver detalle</button>
      </div>
    </div>
  )
}

export default ProductCard