import React from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale } from  "react-datepicker";

import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import '../../styles/calendarProduct.css'

export const CalendarMobile = () => {
  registerLocale('es', es)
  return (
    <div className='calendarProduct calendarMobile'>
      <DatePicker
        inline
        locale="es"
        monthsShown={1}
        minDate={new Date(Date.now())}
        readOnly
        /* excludeDateIntervals={[{
          start: subDays(new Date(), 5),
          end: addDays(new Date(), 5)
        }]} */
      />
    </div>
  )
}

export const CalendarDesktop = () => {
  registerLocale('es', es)
  return (
    <div className='calendarProduct calendarDesktop'>
      <DatePicker
        inline
        locale="es"
        monthsShown={2}
        minDate={new Date(Date.now())}
        readOnly
      />
    </div>
  )
}