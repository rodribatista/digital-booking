import React, { useState, useEffect } from 'react'
import { filterCities } from '../utils/citiesList'

import pointer from '../assets/icons/pointer_outline.svg'

import '../styles/citiesList.css'

const cities = [
  {
    "name": "Buenos Aires",
    "country": "Argentina"
  },
  {
    "name": "Córdoba",
    "country": "Argentina"
  },
  {
    "name": "Rosario",
    "country": "Argentina"
  },
  {
    "name": "Mendoza",
    "country": "Argentina"
  },
  {
    "name": "La Plata",
    "country": "Argentina"
  },
  {
    "name": "Mar del Plata",
    "country": "Argentina"
  },
  {
    "name": "Salta",
    "country": "Argentina"
  }
]

const CitiesList = ({cityValue, setCityValue, setShowList}) => {

  const [citiesList, setCitiesList] = useState(cities)

  useEffect(()=>{
    setCitiesList(filterCities(cityValue, cities))
  }, [cityValue])

  const handleClick = (e) => {
    setCityValue(e.target.id)
    setShowList(false)
  }

  return (
    <ul className='citiesList'>
      {citiesList.length > 0 ?
        citiesList.slice(0,5).map((city, index) => (
          <li
            key={index}
            id={city.name}
            onClick={handleClick}
          >
            <img src={pointer} alt=''/>
            <div>
              <p>{city.name}</p>
              <span>{city.country}</span>
            </div>
          </li>
        )) :
        <p>No hay destinos para mostrar</p>
      }
    </ul>
  )
}

export default CitiesList