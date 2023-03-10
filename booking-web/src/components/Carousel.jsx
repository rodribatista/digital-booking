import React, { useState } from 'react'

import close from '../assets/icons/x_mark.svg'
import goBack from '../assets/icons/carousel_back.svg'
import goNext from '../assets/icons/carousel_next.svg'
import '../styles/carousel.css'

const Carousel = ({images, setShowCarousel}) => {

  const [ currentImg, setCurrentImg ] = useState(0)
  
  return (
    <div className='carouselContainer'>
      <div className='carouselModal'>
        <img src={images[currentImg]?.url} alt="" className='carouselImg'/>
        <img src={close} alt="" className='carouselClose'
          onClick={() => setShowCarousel(false)}/>
        {currentImg > 0 &&
        <img src={goBack} alt="" className='carouselIcon carouselGoBack'
          onClick={() => setCurrentImg(currentImg - 1)}/>}
        {currentImg < images.length - 1 &&
        <img src={goNext} alt="" className='carouselIcon carouselGoNext'
          onClick={() => setCurrentImg(currentImg + 1)}/>}
        <p>{`${currentImg + 1} / ${images.length}`}</p>
      </div>
    </div>
  )
}

export default Carousel