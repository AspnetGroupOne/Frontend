import React, { useEffect, useState } from 'react'
import '../../stylings/ScheduleComp.css'
import { EVENT_SCHEDULE_SERVICE } from '../../utils/serviceConfig';

const EventSchedule = ({ id, reloadData }) => {
    const [data, setData] = useState([]);

    const [gateOpenStart, setGateOpenStart] = useState("");
    const [gateOpenEnd, setGateOpenEnd] = useState("");
    const [preShowStart, setPreShowStart] = useState("");
    const [preShowEnd, setPreShowEnd] = useState("");
    const [ceremonyStart, setCeremonyStart] = useState("");
    const [ceremonyEnd, setCeremonyEnd] = useState("");
    const [concertStart, setConcertStart] = useState("");

    //Fetches the data and sets it.
    const getData = async () => {
        try{
            const res = await fetch(`${EVENT_SCHEDULE_SERVICE.URL}/api/Schedules/${id}`,
                {
                    headers: {
                    'X-API-KEY': EVENT_SCHEDULE_SERVICE.API_KEY,
                    'Content-Type': 'application/json'
                    }
                });
            const data = await res.json();
            if (!data.success)
                console.error("No schedule found.")
            else{
                setData(data.content)

                setGateOpenStart(data.content.gateOpenStart)
                setGateOpenEnd(data.content.gateOpenEnd)
                setPreShowStart(data.content.preShowStart)
                setPreShowEnd(data.content.preShowEnd)
                setCeremonyStart(data.content.ceremonyStart)
                setCeremonyEnd(data.content.ceremonyEnd)
                setConcertStart(data.content.concertStart)
            }
        }
        catch (error){
            console.error("Something went wrong when fetching the schedule.")
        }
    }
    
    //Function to format each line and add either AM or PM depending on which time of day.
    const formatTimes = (data) => {
        const hours = data.slice(0,2)
        const minutes = data.slice(2,4)
        if (hours < 12){
            return `${hours}:${minutes} AM`
        }
        else{
            return `${hours}:${minutes} PM`
        }
    }

    //Will make the getData run once on load and then whenever the reloadData it updated.
    useEffect(() => {
        getData();
    },[reloadData])

    return (
        <>
            <div className='schedule-component-wrapper'>
                <header className='schedule-component-header'>
                    <h6>Event Schedule</h6>

                    {/* Going to be used to add a small modal where you can send a delete request of the information. */}
                    <i className="fa-light fa-ellipsis"></i>
                </header>
                <div className='schedule-component-line'>
                    <p className='schedule-component-time'>{formatTimes(gateOpenStart)} - {formatTimes(gateOpenEnd)}</p>
                    <p className='schedule-component-text'>Gate Opens</p>
                </div>
                <div className='schedule-component-line'>
                    <p className='schedule-component-time'>{formatTimes(preShowStart)} - {formatTimes(preShowEnd)}</p>
                    <p className='schedule-component-text'>Pre-Show Activities</p>
                </div>
                <div className='schedule-component-line'>
                    <p className='schedule-component-time'>{formatTimes(ceremonyStart)} - {formatTimes(ceremonyEnd)}</p>
                    <p className='schedule-component-text'>Opening Ceremony</p>
                </div>
                <div className='schedule-component-line'>
                    <p className='schedule-component-time'>{formatTimes(concertStart)}</p>
                    <p className='schedule-component-text'>Concert Begin</p>
                </div>
            </div>
        </>
    )
}

export default EventSchedule