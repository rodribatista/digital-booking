import React, { useState, useEffect } from 'react'
import { fetchData } from '../utils/utils'
import { endpoint } from '../utils/utils'
import { filterCities } from '../utils/citiesList'

import pointer from '../assets/icons/pointer_outline.svg'

import '../styles/citiesList.css'

const citiesData = fetchData(`${endpoint}/cities`)

const CitiesList = ({cityValue, setCityValue, setShowList}) => {
  
  const cities = citiesData.read()
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
            <img src={pointer} alt=''
              id={city.name}/>
            <div id={city.name}>
              <p id={city.name}>{city.name}</p>
              <span
                id={city.name}>{city.country.name}</span>
            </div>
          </li>
        )) :
        <p>No hay destinos para mostrar</p>
      }
      <p onClick={() => setShowList(false)}>Cerrar</p>
    </ul>
  )
}

export default CitiesList