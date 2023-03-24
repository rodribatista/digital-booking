import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CitiesList from './searchBar/CitiesList'
import { CalendarMobile, CalendarDesktop } from './searchBar/Calendar'

import pointer from '../assets/icons/pointer_solid.svg'
import calendar from '../assets/icons/calendar.svg'
import x_mark from '../assets/icons/x_mark.svg'

import '../styles/searchBar.css'

const SearchBar = () => {

  const navigate = useNavigate()

  const [showCitiesList, setShowCitiesList] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const [cityId, setCityId] = useState('') 
  const [cityValue, setCityValue] = useState('') 

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cityValue.length > 0) {
      navigate(`/products/city/${cityValue}`,
        { state: { id: cityId }})}
  }

  const handleDate = (date) => {
    return date.toLocaleDateString("es-CL")
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
            cityValue={cityValue}
            setCityValue={setCityValue}
            setCityId={setCityId}
            setShowList={setShowCitiesList}
          />}
        </div>
        <div className='searchCityDateContainer'>
          <div className='searchCityDateInput'>
            <img src={calendar} alt=""/>
            <input
              onFocus={() => setShowCalendar(true)}
              type="text"
              placeholder="Check-in / Check-out"
              value={startDate != null && endDate != null ?
                handleDate(startDate) + ' / ' + handleDate(endDate) : ''}
            />
            {startDate && <img src={x_mark} alt=""
              className='closeIcon'
              onClick={() => setDateRange([null, null])}/>}
          </div>
          {showCalendar && <CalendarMobile
            startDate={startDate}
            endDate={endDate}
            setDateRange={setDateRange}
            setShowCalendar={setShowCalendar}
          />}
          {showCalendar && <CalendarDesktop
            startDate={startDate}
            endDate={endDate}
            setDateRange={setDateRange}
            setShowCalendar={setShowCalendar}
          />}
        </div>
        <button type="submit"
          className='searchButton'>Buscar</button>
      </form>
    </section>
  )  
}

export default SearchBar