import React from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale } from  "react-datepicker";

import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import '../../styles/calendar.css'

export const CalendarMobile = (
  {startDate, endDate, setDateRange, setShowCalendar}) => {
  registerLocale('es', es)
  return (
    <div className='calendar onTablet'>
      <DatePicker
        inline
        locale="es"
        monthsShown={1}
        selectsRange={true}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date(Date.now())}
        onChange={(dates) => setDateRange(dates)}
        isClearable={true}
      />
      <button className='searchButton'
        onClick={() => setShowCalendar(false)}>Aplicar</button>
    </div>
  )
}

export const CalendarDesktop = (
  {startDate, endDate, setDateRange, setShowCalendar}) => {
  registerLocale('es', es)
  return (
    <div className='calendar onDesktop'>
      <DatePicker
        inline
        locale="es"
        monthsShown={2}
        selectsRange={true}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date(Date.now())}
        onChange={(dates) => setDateRange(dates)}
        isClearable={true}
      />
      <button className='searchButton'
        onClick={() => setShowCalendar(false)}>Aplicar</button>
    </div>
  )
}