import React from 'react'

import '../styles/categoryCard.css'

const CategoryCard = ({category}) => {
  return (
    <div className='categoryCard'>
      <img src={category.imageUrl} alt="" />
      <div className='categoryInfo'>
        <h1>{category.title}</h1>
        <p>107.105 hoteles</p>
      </div>
    </div>
  )
}

export default CategoryCard