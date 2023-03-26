import React from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale } from  "react-datepicker";

import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css'

import '../../styles/calendarSearchBar.css'

export const CalendarMobile = (
  {startDate, endDate, setDateRange, setShowCalendar}) => {
  registerLocale('es', es)
  return (
    <object className='calendarSearchBar onMobile'>
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
      <button
        onClick={() => setShowCalendar(false)}>Aplicar</button>
    </object>
  )
}

export const CalendarDesktop = (
  {startDate, endDate, setDateRange, setShowCalendar}) => {
  registerLocale('es', es)
  return (
    <object className='calendarSearchBar onTablet onDesktop'>
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
      <button
        onClick={() => setShowCalendar(false)}>Aplicar</button>
    </object>
  )
}