import React from 'react'

import '../../styles/categoryCard.css'

const CategoryCard = ({category}) => {
  return (
    <div className='categoryCard'>
      <img src={category.imageUrl} alt="" />
      <div>
        <h3>{category.title}</h3>
        <p>107.105 hoteles</p>
      </div>
    </div>
  )
}

export default CategoryCard