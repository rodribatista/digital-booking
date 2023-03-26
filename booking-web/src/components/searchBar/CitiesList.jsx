import React, { useState, useEffect } from 'react'
import { fetchData } from '../../utils/utils'
import { endpoint } from '../../utils/utils'
import { filterCities } from '../../utils/citiesList'

import pointer from '../../assets/icons/pointer_outline.svg'

import '../../styles/citiesList.css'

const citiesData = fetchData(`${endpoint}/cities`)

const CitiesList = ({
  cityValue, setCityValue, setCityId, setShowList}) => {
  
  const cities = citiesData.read()
  const [citiesList, setCitiesList] = useState(cities ? cities : [])

  useEffect(()=>{
    setCitiesList(filterCities(cityValue, cities ? cities : []))
  }, [cities, cityValue])

  const stopPropagation = (e) => {
    e.stopPropagation()
    handleClick()
  }

  const handleClick = (e) => {
    setCityId(e.target.value)
    setCityValue(e.target.id)
    setShowList(false)
  }

  return (
    <ul className='citiesList'>
      {citiesList.length > 0 ?
        citiesList.slice(0,5).map((city) => (
          <li
            key={city.id} id={city.name}
            value={city.id}
            onClick={handleClick}
          >
            <img src={pointer} alt='' onClick={(stopPropagation)}/>
            <div onClick={stopPropagation}>
              <p onClick={stopPropagation}>{city.name}</p>
              <span onClick={stopPropagation}>{city.country.name}</span>
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