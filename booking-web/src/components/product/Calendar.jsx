import React from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale } from  "react-datepicker"
import { getBookings } from '../../utils/utils'

import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css'

import '../../styles/calendarProduct.css'

export const CalendarMobile = ({bookings}) => {
  registerLocale('es', es)
  return (
    <div className='calendarProduct calendarMobile'>
      <DatePicker
        inline
        locale="es"
        monthsShown={1}
        minDate={new Date(Date.now())}
        excludeDateIntervals={getBookings(bookings)}
        readOnly
      />
    </div>
  )
}

export const CalendarDesktop = ({bookings}) => {
  registerLocale('es', es)
  return (
    <div className='calendarProduct calendarDesktop'>
      <DatePicker
        inline
        locale="es"
        monthsShown={2}
        minDate={new Date(Date.now())}
        excludeDateIntervals={getBookings(bookings)}
        readOnly
      />
    </div>
  )
}