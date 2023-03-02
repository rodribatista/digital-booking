import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CitiesList from './CitiesList'

import pointer from '../assets/icons/pointer_solid.svg'

import '../styles/searchBar.css'

const SearchBar = () => {

  const navigate = useNavigate()

  const [cityValue, setCityValue] = useState('')
  const [showList, setShowList] = useState(false)
  
  const handleCityValue = (e) => {
    setCityValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/cities/${cityValue}`)
  }

  return (
    <section className="searchBar">
      <h2>Busca ofertas en hoteles, casas y mucho más</h2>
      <form onSubmit={handleSubmit}>
        <div className='searchCityContainer'>
          <div className='searchCity'>
            <img src={pointer} alt=""/>
            <input
              onFocus={() => setShowList(true)}
              onChange={handleCityValue}
              type="text"
              placeholder="¿A dónde vamos?"
              value={cityValue}
            />
          </div>
          {showList && <CitiesList
            cityValue={cityValue}
            setCityValue={setCityValue}
            setShowList={setShowList}
          />}
        </div>
        <button type="submit">Buscar</button>
      </form>
    </section>
  )  
}

export default SearchBar