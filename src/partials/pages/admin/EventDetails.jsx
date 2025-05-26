import React, { useEffect, useState } from 'react'
import '../../../stylings/Eventdetails.css'
import ModalEventSchedule from './../../modals/ModalEventSchedule';
import ModalEventRules from './../../modals/ModalEventRules';
import EventSchedule from '../../components/EventSchedule';
import EventRules from '../../components/EventRules';
import ModalTerms from '../../modals/ModalTerms';
import TermsComp from '../../components/TermsComp';


const EventDetails = ({eventID}) => {
  const [openModal, setOpenModal] = useState(null);
  //Hardcoded id for now. Must intake an id from another page.
  const [eventId, setEventId] = useState("56f58514-7581-4b18-97f5-b6eb5ba7b9c9");
  const [eventName, setEventName] = useState("Event Title");
  const [showModal, setShowModal] = useState("hide-modal")

  // This reloadSchedule/reloadData solution comes from chatgpt. 
  // It is passing the reloadData to be used within the useEffect in the component
  // to update the fetched data inside the component if someone changes it in the modal.
  // Without it, it will just keep showing old data until you reload the entire page.
  const [reloadComps, setReloadComps] = useState(false)

  // OpenChosen adds display flex to the wrapper for all the modals.
  // OpenModal chooses which modal to open depending on input from admins button choice.
  const OpenChosen = (choice) => {
    setShowModal("show-modal")
    setOpenModal(choice);
  }

  // Closes the modal by changing display flex to none.
  // Nulls the admins choice and sends a changes the useState 
  // to reloadSchedule to make the component re-fetch the updated data.
  const CloseModal = () => {
    setShowModal("hide-modal")
    setOpenModal(null);
    setReloadComps(prev => !prev);
  }

  // Making sure it loads once.
  useEffect(() => {
  },[])


  // Need to add request to eventhandler to get name of event and whatever else needed.
  
  return (
  <>
    <main className='event-details-main'>
      <div className='event-details-top'>
        <div className='event-details-top-header'>
          <h1>{eventName}</h1>
        </div>
        <div className='event-details-top-info'>
          <span>
            <p>Event date: {}</p>
            <p>Event artist: {}</p>
          </span>
          <span>
            <p>Event category: {}</p>
            <p>Event Location: {}</p>
          </span>
          
        </div>
        <section className='event-details-top-footer'>
          <button className='btn-2 btn-pink btn-left' onClick={() => OpenChosen("schedules") } >Schedule</button>
          <button className='btn-2 btn-pink btn-mid' onClick={() => OpenChosen("rules") } >Rules</button>
          <button className='btn-2 btn-pink btn-mid'onClick={() => OpenChosen("terms") } >Terms</button>
          <button className='btn-2 btn-pink btn-mid'>Venue Map</button>
          <button className='btn-2 btn-pink btn-mid'>Text</button>
          <button className='btn-2 btn-pink btn-right'>Text</button>
        </section>
      </div>

      <section className={`modals-details-wrapper ${showModal}`}>
        {openModal === "rules" && (
          <div className="modal-rules">
            <ModalEventRules closeModal={CloseModal} id={eventId} eventName={eventName} />
          </div>
        )}
        {openModal === "schedules" && (
          <div className="modal-schedules"> 
            <ModalEventSchedule closeModal={CloseModal} id={eventId} eventName={eventName} />
          </div>
        )}
        {openModal === "terms" && (
          <div className="modal-terms"> 
            <ModalTerms closeModal={CloseModal} id={eventId} eventName={eventName} />
          </div>
        )}
      </section>


      <section className='event-details-left'>
        <EventSchedule id={eventId} reloadData={reloadComps}/>
        <TermsComp id={eventId} reloadData={reloadComps}/>
      </section>
      <section className='event-details-right'>
        <EventRules id={eventId} reloadData={reloadComps}/>
      </section>
    </main>
  </>
)
}

export default EventDetails