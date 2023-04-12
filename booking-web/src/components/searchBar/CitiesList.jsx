import React, { useRef, useState, useEffect } from 'react'
import { filterCities } from '../../utils/citiesList'

import pointer from '../../assets/icons/pointer_outline.svg'

import '../../styles/citiesList.css'


const CitiesList = ({
  cities, cityValue, setCityValue, setCityId, setShowList}) => {
  
  const [citiesList, setCitiesList] = useState(cities.response ? cities.response : [])

  useEffect(()=>{
    setCitiesList(filterCities(cityValue, cities.response ? cities.response : []))
  }, [cityValue])

  const handleClick = (id, value) => {
    setCityId(id)
    setCityValue(value)
    setShowList(false)
  }

  return (
    <ul className='citiesList'>
      {citiesList.length > 0 ?
        citiesList.slice(0,5).map((city) => (
          <li
            key={city.id}
            onClick={() => handleClick(city.id, city.name)}
          >
            <img src={pointer} alt=''
              onClick={() => handleClick(city.id, city.name)}/>
            <div onClick={() => handleClick(city.id, city.name)}>
              <p onClick={() => handleClick(city.id, city.name)}>
                {city.name}</p>
              <span onClick={() => handleClick(city.id, city.name)}>
                {city.country.name}</span>
            </div>
          </li>
        )) :
        <p>No hay destinos para mostrar</p>
      }
      <p className='closeList'
        onClick={() => setShowList(false)}>Cerrar</p>
    </ul>
  )
}

export default CitiesList