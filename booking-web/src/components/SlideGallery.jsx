import React, { useState } from 'react'

import goBack from '../assets/icons/carousel_back.svg'
import goNext from '../assets/icons/carousel_next.svg'

import '../styles/slideGallery.css'

const SlideGallery = ({images}) => {

  const [ currentImg, setCurrentImg ] = useState(0)

  return (
    <div className='onTablet sliderContainer'>
      <img src={images[currentImg]?.url} alt="" className='sliderImg'/>
      {currentImg > 0 &&
        <img src={goBack} alt="" className='sliderIcon sliderGoBack'
          onClick={() => setCurrentImg(currentImg - 1)}/>}
      {currentImg < images.length - 1 &&
        <img src={goNext} alt="" className='sliderIcon sliderGoNext'
          onClick={() => setCurrentImg(currentImg + 1)}/>}
      <p>{`${currentImg + 1} / ${images.length}`}</p>
    </div> 
  )
}

export default SlideGallery