import React, { useEffect, useState } from 'react'
import './stylings/Calendar_days_card.css'


const CalendarDayCard = ({calendarDays}) => {
    //Carrier for the class which gets switched below.
    const [colorSmallCard, setColorSmallCard] = useState("change-color-blue");

    //Turning a string to an int. 
    const day = parseInt(calendarDays.date, 10)

    //Will change the color depending on if the date is even or not.
    function CalendarCheckDay(){
        if (day % 2 === 0) {
            setColorSmallCard("change-color-pink");
        }
    }

    //Will run everytime the date changes.
    useEffect(() => {
        CalendarCheckDay();
    }, [calendarDays.date])

    return (
        <div className='calendar-day-card-content'>
            <aside className={`calendar-day-color-card ${colorSmallCard}`}>
                <p className='color-card-date'>{calendarDays.date}</p>
                <p className='color-card-day'>{calendarDays.day}</p>
            </aside>
            <section className='calendar-day-card-middle'>
                <p className='calendar-day-card-title'>{calendarDays.title}</p>
                <p className='calendar-day-card-description'>{calendarDays.description}</p>
                <footer className='calendar-day-card-footer'>
                    <p className='calendar-day-card-theme'>{calendarDays.theme}</p>
                    <p className='calendar-day-card-time'><i className="fa-thin fa-clock"></i> {calendarDays.startTime} PM - {calendarDays.endTime} PM</p>
                </footer>
            </section>
        </div>
    )
}

export default CalendarDayCard