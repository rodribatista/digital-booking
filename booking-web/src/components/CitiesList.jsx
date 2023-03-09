import React, { useState, useEffect } from 'react'
import { filterCities } from '../utils/citiesList'

import pointer from '../assets/icons/pointer_outline.svg'

import '../styles/citiesList.css'

const CitiesList = ({cities, cityValue, setCityValue, setShowList}) => {
  
  const [citiesList, setCitiesList] = useState(cities ? cities : [])

  useEffect(()=>{
    setCitiesList(filterCities(cityValue, cities ? cities : []))
  }, [cityValue])

  const handleClick = (e) => {
    setCityValue(e.target.id)
    setShowList(false)
  }

  return (
    <ul className='citiesList'>
      {citiesList.length > 0 ?
        citiesList.slice(0,5).map((city) => (
          <li
            key={city.id}
            id={city.name}
            onClick={handleClick}
          >
            <img src={pointer} alt=''/>
            <div>
              <p>{city.name}</p>
              <span>{city.country.name}</span>
            </div>
          </li>
        )) :
        <p>No hay destinos para mostrar</p>
      }
    </ul>
  )
}

export default CitiesList