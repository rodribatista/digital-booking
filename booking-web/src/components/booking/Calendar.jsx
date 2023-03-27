import React from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale } from  "react-datepicker";

import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css'

import '../../styles/calendarProduct.css'

export const CalendarMobile = (
  {startDate, endDate, setDateRange}) => {
  registerLocale('es', es)
  return (
    <div className='calendarProduct calendarMobile'>
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
        readOnly
      />
    </div>
  )
}

export const CalendarDesktop = (
  {startDate, endDate, setDateRange}) => {
  registerLocale('es', es)
  return (
    <div className='calendarProduct calendarDesktop'>
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
        readOnly
      />
    </div>
  )
}