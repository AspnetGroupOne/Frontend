import React, { useEffect, useState } from 'react'
import "../../stylings/ScheduleModal.css";
import { EVENT_SCHEDULE_SERVICE } from '../../utils/serviceConfig';


const ModalEventSchedule = ({ eventName, id, closeModal }) => {
    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    //The form data required. (Together with the id ofc.)
    const [gateOpenStart, setGateOpenStart] = useState();
    const [gateOpenEnd, setGateOpenEnd] = useState();
    const [preShowStart, setPreShowStart] = useState();
    const [preShowEnd, setPreShowEnd] = useState();
    const [ceremonyStart, setCeremonyStart] = useState();
    const [ceremonyEnd, setCeremonyEnd] = useState();
    const [concertStart, setConcertStart] = useState();

    //Fetching and if the response yields data then load it and set the mode to editing instead of adding.
    const getData = async () => {
        try {
            const res = await fetch(`${EVENT_SCHEDULE_SERVICE.URL}/api/Schedules/${id}`,
                {
                    headers: {
                        'X-API-KEY': EVENT_SCHEDULE_SERVICE.API_KEY,
                        'Content-Type': 'application/json'
                    }
                });
            const data = await res.json();
            if (!data.success || !data.content){
                setIsEdit(false)
            }
            else{
                setData(data.content)
                setIsEdit(true)

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
            console.error("Something went wrong when fetching data.")
        }
    }

    //Function to handle the submit. Will either POST or PUT depending on the state of isEdit.
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if (isEdit === false){
                //POST
                const formData = {
                    eventId: id,
                    gateOpenStart: gateOpenStart,
                    gateOpenEnd: gateOpenEnd,
                    preShowStart: preShowStart,
                    preShowEnd: preShowEnd,
                    ceremonyStart: ceremonyStart,
                    ceremonyEnd: ceremonyEnd,
                    concertStart: concertStart
                }
                const res = await fetch(`${EVENT_SCHEDULE_SERVICE.URL}/api/Schedules/`, {
                    method: 'POST',
                    headers: {
                        'X-API-KEY': EVENT_SCHEDULE_SERVICE.API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                if (res.ok) {
                    closeModal();
                }
                else{
                    console.error("Failed to add schedule.", res)
                }
            }
            else{
                //PUT
                const formData = {
                    eventId: id,
                    gateOpenStart: gateOpenStart,
                    gateOpenEnd: gateOpenEnd,
                    preShowStart: preShowStart,
                    preShowEnd: preShowEnd,
                    ceremonyStart: ceremonyStart,
                    ceremonyEnd: ceremonyEnd,
                    concertStart: concertStart
                }
                const res = await fetch(`${EVENT_SCHEDULE_SERVICE.URL}/api/Schedules/`, {
                    method: 'PUT',
                    headers: {
                        'X-API-KEY': EVENT_SCHEDULE_SERVICE.API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                if (res.ok) {
                    closeModal();
                }
                else{
                    console.error("Failed to add schedule.", res)
                }
            }
        }
        catch (error){
            console.error("Something went wrong when submitting data.")
        }
    };

    //Runs once on load to set the data if there is any.
    useEffect(() => {
        getData();
    },[])

    // If we have previous data, then it will show a form with the data where you can edit it,
    // else it will show a new form which will let you add data.
    return (
        <>
            {isEdit ? (
                <main className='modal-schedule-main'>
                    <header className='modal-schedule-header'>
                        <h2>{eventName}</h2> 
                        <button className='btn btn-close-pink' onClick={() => closeModal()}>X</button>
                    </header>
                    <form onSubmit={handleSubmit}>

                        <div className='schedule-form-section '>
                            <div className='schedule-form-section-left'>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="gateOpenStart">Gate open start:</label>
                                    <input className='schedule-input' type="text" id='gateOpenStart' minLength={4} maxLength={4} placeholder={gateOpenStart} onChange={(e) => setGateOpenStart(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="preShowStart">Pre-show start:</label>
                                    <input className='schedule-input' type="text" id='preShowStart' minLength={4} maxLength={4} placeholder={preShowStart} onChange={(e) => setPreShowStart(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="ceremonyStart">Ceremony start:</label>
                                    <input className='schedule-input' type="text" id='ceremonyStart' minLength={4} maxLength={4} placeholder={ceremonyStart} onChange={(e) => setCeremonyStart(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="concertStart">Concert starts:</label>
                                    <input className='schedule-input' type="text" id='concertStart' minLength={4} maxLength={4} placeholder={concertStart} onChange={(e) => setConcertStart(e.target.value)} />
                                </div>
                            </div>

                            <div className='schedule-form-section-right'>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="gateOpenEnd">Gate open end:</label>
                                    <input className='schedule-input' type="text" id='gateOpenEnd' minLength={4} maxLength={4} placeholder={gateOpenEnd} onChange={(e) => setGateOpenEnd(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="preShowEnd">Pre-show end:</label>
                                    <input className='schedule-input' type="text" id='preShowEnd' minLength={4} maxLength={4} placeholder={preShowEnd} onChange={(e) => setPreShowEnd(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="ceremonyEnd">Ceremony end:</label>
                                    <input className='schedule-input' type="text" id='ceremonyEnd' minLength={4} maxLength={4} placeholder={ceremonyEnd} onChange={(e) => setCeremonyEnd(e.target.value)} />
                                </div>
                                <button className='btn btn-pink' type='submit'>Apply schedule</button>
                            </div>
                        </div>
                    </form>
                </main>
            ) : (

                <main className='modal-schedule-main'>
                    <header className='modal-schedule-header'>
                        <h2>{eventName}</h2> 
                        <button className='btn btn-close-pink' onClick={() => closeModal()}>X</button>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <div className='schedule-form-section '>
                            <div className='schedule-form-section-left'>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="gateOpenStart">Gate open start:</label>
                                    <input className='schedule-input' required type="text" id='gateOpenStart' placeholder='1200' minLength={4} maxLength={4} onChange={(e) => setGateOpenStart(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="preShowStart">Pre-show start:</label>
                                    <input className='schedule-input' required type="text" id='preShowStart' placeholder='1200' minLength={4} maxLength={4} onChange={(e) => setPreShowStart(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="ceremonyStart">Ceremoney start:</label>
                                    <input className='schedule-input' required type="text" id='ceremonyStart' placeholder='1200' minLength={4} maxLength={4} onChange={(e) => setCeremonyStart(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="concertStart">Concert starts:</label>
                                    <input className='schedule-input' required type="text" id='concertStart' placeholder='1200' minLength={4} maxLength={4} onChange={(e) => setConcertStart(e.target.value)} />
                                </div>
                            </div>

                            <div className='schedule-form-section-right'>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="gateOpenEnd">Gate open end:</label>
                                    <input className='schedule-input' required type="text" id='gateOpenEnd' placeholder='1200' minLength={4} maxLength={4} onChange={(e) => setGateOpenEnd(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="preShowEnd">Pre-show end:</label>
                                    <input className='schedule-input' required type="text" id='preShowEnd' placeholder='1200' minLength={4} maxLength={4} onChange={(e) => setPreShowEnd(e.target.value)} />
                                </div>
                                <div className='schedule-form-group'>
                                    <label className='schedule-label' htmlFor="ceremonyEnd">Ceremoney end:</label>
                                    <input className='schedule-input' required type="text" id='ceremonyEnd' placeholder='1200' minLength={4} maxLength={4} onChange={(e) => setCeremonyEnd(e.target.value)} />
                                </div>
                                <button className='btn btn-pink' type='submit'>Apply schedule</button>
                            </div>
                        </div>
                    </form>
                </main>
            )}
        </>
    )
}
export default ModalEventSchedule