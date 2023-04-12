import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { endpoint } from '../../utils/utils'

import CitiesList from '../searchBar/CitiesList'
import { CalendarMobile, CalendarDesktop } from '../searchBar/Calendar'

import pointer from '../../assets/icons/pointer_solid.svg'
import calendar from '../../assets/icons/calendar.svg'
import x_mark from '../../assets/icons/x_mark.svg'

import '../../styles/searchBar.css'

const SearchBar = () => {

  const navigate = useNavigate()

  const [showCitiesList, setShowCitiesList] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const cities = useFetch(`${endpoint}/cities`)

  const [cityId, setCityId] = useState('') 
  const [cityValue, setCityValue] = useState('') 

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cityValue.length > 0 && !startDate && !endDate) {
      navigate(`/products/city/${cityValue}`,
        { state: { id: cityId }})
    } else if (cityValue.length < 1 && startDate && endDate) {
      navigate(`/products/booking/${handleDate(startDate)}/${handleDate(endDate)}`)
    } else if (cityValue.length > 0 && startDate && endDate) {
      navigate(`/products/city/${cityValue}/${handleDate(startDate)}/${handleDate(endDate)}`,
        { state: { id: cityId }})
    } else {
      alert("Debes seleccionar datos para la búsqueda")
    }
  }

  const handleDate = (date) => {
    return date.toLocaleDateString("es-CL")
  }

  return (
    <section className="searchBar">
      <h2>Busca ofertas en hoteles, casas y mucho más</h2>
      <form onSubmit={handleSubmit}>
        <div className='searchBar-input'>
          <div>
            <img src={pointer} alt="" className='icons'/>
            <input
              onFocus={() => {
                setShowCitiesList(true)
                setShowCalendar(false)}}
              onChange={(e) => setCityValue(e.target.value)}
              type="text"
              placeholder="¿A dónde vamos?"
              value={cityValue}
            />
            {cityValue.length > 0 && <img src={x_mark} alt="" 
              className='clearInput'
              onClick={() => setCityValue('')}/>}
          </div>
          {showCitiesList && <CitiesList
            cities={cities}
            cityValue={cityValue}
            setCityValue={setCityValue}
            setCityId={setCityId}
            setShowList={setShowCitiesList}
          />}
        </div>
        <div className='searchBar-input'>
          <div>
            <img src={calendar} alt="" className='icons'/>
            <input
              onFocus={() => {
                setShowCitiesList(false)
                setShowCalendar(true)}}
              type="text"
              placeholder="Check-in / Check-out"
              value={startDate != null && endDate != null ?
                handleDate(startDate) + ' / ' + handleDate(endDate) : ''}
            />
            {startDate && <img src={x_mark} alt=""
              className='clearInput'
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
        <button type="submit">Buscar</button>
      </form>
    </section>
  )  
}

export default SearchBar