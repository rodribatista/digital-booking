import {useState} from 'react'
import { Calendar } from './Calendar'

export const CalendarsInput = () => {
    const [arrivalDate, setArrivalDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [departureDate, setDepartureDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));
    // console.log([arrivalDate, departureDate])

    const [calendarsVisible, setCalendarsVisible] = useState(false);

    const handleClick = (ev) => {
        setCalendarsVisible(true);
    }

    const handleApply = ev => {
        setCalendarsVisible(false);
    }

    return <div className='calendarsInput'>
        <button className="dateButton" onClick={handleClick}>{arrivalDate.toLocaleDateString()}</button>
        <button className="dateButton" onClick={handleClick}>{departureDate.toLocaleDateString()}</button>
        <div className={calendarsVisible ? 'calendars visible' : 'calendars'}>
            <Calendar actualDate={arrivalDate} setActualDate={setArrivalDate}/>
            <Calendar actualDate={departureDate} setActualDate={setDepartureDate} arrivalDate={arrivalDate}/>
            <div className="applyContainer">
                <button onClick={handleApply} className="apply">Aplicar</button>
            </div>
        </div>
    </div>
}