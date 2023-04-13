import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getIcon } from '../../utils/iconsFeatures'

import fav from '../../assets/icons/heart_fav.svg'
import pointer from '../../assets/icons/pointer_solid.svg'
import noImage from '../../assets/images/no-image.png'

import '../../styles/productCard.css'

const ProductCard = ({product}) => {

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    navigate(`/products/${e.target.value}`,
      { state: { id: e.target.id }})
  }

  const handleImage = (images) => {
    if (images[0]) {
      return images[0].url
    } else {
      return noImage
    }
  }

  return (
    <div className='productCard'>
      <div className='productCardImage'>
        {/* <img src={fav} alt="" className='icons fav'/> */}
        <img className='productImg' src={handleImage(product.images)} alt="" />
      </div>
      <div className='productCardInfo'>
        <div>
          <h4>{product.category.title.toUpperCase()}</h4>
          <h2>{product.title}</h2>
        </div>
        <div className='productCardLocation'>
          <img src={pointer} alt="" className='icons'/>
          <p>{`${product.address.city.name}, ${product.address.city.country.code}`}</p>
        </div>
        <div className='productCardFeatures'>
          {product.features.map(feature => (
            <img src={getIcon(feature.id)} alt={feature.name} className='icons'/>
          ))}
        </div>
        <p>
          {product.description.length > 100 ?
            `${product.description.substring(0, 100)}...`
          : product.description}
        </p>
        <button
          onClick={handleClick}
          id={product.id}
          value={product.title}
        >
          Ver detalle
        </button>
      </div>
    </div>
  )
}

export default ProductCard