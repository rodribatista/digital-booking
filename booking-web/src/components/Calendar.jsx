import {useState} from 'react'

import { daysInMonth, daysArrary, getSortedDays, validateDate } from '../utils/index'

export const Calendar = ({actualDate, setActualDate, arrivalDate}) => {

    // console.log([actualDate.toLocaleDateString()])

    const handleLeft = () => {
        let newDate = new Date();
        if (actualDate.getMonth() !== 0) {
            newDate.setMonth(actualDate.getMonth() - 1)
            newDate.setDate(actualDate.getDate())
            newDate.setFullYear(actualDate.getFullYear())
            setActualDate(newDate);
            return;
        }

        newDate.setDate(actualDate.getDate());
        newDate.setMonth(11);
        newDate.setFullYear(actualDate.getFullYear() - 1)
        setActualDate(newDate);
    }

    const handleRight = () => {
        let newDate = new Date();
        if (actualDate.getMonth() !== 11) {
            newDate.setMonth(actualDate.getMonth() + 1)
            newDate.setDate(actualDate.getDate())
            newDate.setFullYear(actualDate.getFullYear())
            setActualDate(newDate);
            return;
        }

        newDate.setDate(actualDate.getDate());
        newDate.setMonth(0);
        newDate.setFullYear(actualDate.getFullYear() + 1)
        setActualDate(newDate);
    }
    

    const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ]

    const handleSelection = e => {
        setActualDate(new Date(actualDate.getFullYear(), actualDate.getMonth(), e.target.id))
    }
    return <div className="calendarContainer">
        <section className='year'>{actualDate.getFullYear()}</section>
        <header className='calendarHeader'>
            <button id="left" className='chevron' onClick={handleLeft}><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.42188 1.40625L2.82812 6L7.42188 10.5938L6.01562 12L0.015625 6L6.01562 0L7.42188 1.40625Z" fill="#666666"/>
</svg>
</button>
            <div>{meses[actualDate.getMonth()]}</div>
            <button id="right" className='chevron' onClick={handleRight}><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.98438 0L7.98438 6L1.98438 12L0.578125 10.5938L5.17188 6L0.578125 1.40625L1.98438 0Z" fill="#666666"/>
</svg></button>
        </header>
        <section className='body'>
            <section className='grid-7col weekDays'>
                {getSortedDays(actualDate.getMonth(), actualDate.getFullYear()).map(day => <span className='day weekDays'>{day}</span>)}
            </section>
            <section className='grid-7col'>{daysArrary(actualDate.getMonth(), actualDate.getFullYear()).map(day => {
                if (day.cat !== 'acc' || (arrivalDate && !validateDate(arrivalDate.toLocaleDateString('en'), day.date))) return <span className="day not-acc" id={day.value} date={day.date}>{day.value}</span>
                else return <span className="day numDay" onClick={handleSelection} id={day.value} date={day.date}>{day.value}</span>}
            )}</section>
        </section>
    </div>
}