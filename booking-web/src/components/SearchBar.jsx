import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { endpoint } from '../utils/utils'
import CitiesList from './CitiesList'
import Calendar from './Calendar'

import pointer from '../assets/icons/pointer_solid.svg'
import calendar from '../assets/icons/calendar.svg'
import x_mark from '../assets/icons/x_mark.svg'

import '../styles/searchBar.css'

const SearchBar = () => {

  const navigate = useNavigate()

  const [cities, setCities] = useState()

  useEffect(() => {
    axios.get(`${endpoint}/cities`)
    .then(response => {
      setCities(response.data)})
    .catch(e => {
      console.log(e);
    })
  }, [])

  const [showCitiesList, setShowCitiesList] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const [cityValue, setCityValue] = useState('')
  const [dateSelected, setDateSelected] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cityValue.length > 0) {
      navigate(`/products/city=/${cityValue}`)}
  }

  return (
    <section className="searchBar">
      <h2>Busca ofertas en hoteles, casas y mucho más</h2>
      <form onSubmit={handleSubmit}>
        <div className='searchCityDateContainer'>
          <div className='searchCityDateInput'>
            <img src={pointer} alt=""/>
            <input
              onFocus={() => setShowCitiesList(true)}
              onChange={(e) => setCityValue(e.target.value)}
              type="text"
              placeholder="¿A dónde vamos?"
              value={cityValue}
            />
            {cityValue.length > 0 && <img src={x_mark} alt="" 
              className='closeIcon'
              onClick={() => setCityValue('')}/>}
          </div>
          {showCitiesList && <CitiesList
            onBlur={() => setShowCitiesList(false)}
            cities={cities}
            cityValue={cityValue}
            setCityValue={setCityValue}
            setShowList={setShowCitiesList}
          />}
        </div>
        <div className='searchCityDateContainer'>
          <div className='searchCityDateInput'>
            <img src={calendar} alt=""/>
            <input
              /* onFocus={() => setShowCalendar(true)} */
              onChange={(e) => setDateSelected(e.target.value)}
              type="text"
              placeholder="Check-in / Check-out"
              value={dateSelected}
            />
            {dateSelected.length > 0 && <img src={x_mark} alt=""
              className='closeIcon'
              onClick={() => setDateSelected('')}/>}
          </div>
          {showCalendar && <Calendar
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            setShowCalendar={setShowCalendar}
          />}
        </div>
        {cityValue.length > 0 ?
          <button type="submit">Buscar</button>
        : <button type="submit" disabled>Buscar</button>}
      </form>
    </section>
  )  
}

export default SearchBar