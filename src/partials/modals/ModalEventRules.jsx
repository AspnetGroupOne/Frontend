import React, { useEffect, useState } from 'react'
import '../../stylings/RulesModal.css'
import { EVENT_RULES_SERVICE } from '../../utils/serviceConfig';

const ModalEventRules = ({ id, closeModal }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  //Learned a new way of doing this part from chatgpt.
  const [rules, setRules] = useState({
    alcohol: false,
    bike: false,
    camera: false,
    hazard: false,
    knife: false,
    merch: false,
    noise: false,
    pets: false,
    picnic: false,
    pill: false,
    tent: false,
    umbrella: false
  });

  const getData = async () => {
    try {
      const res = await fetch(`${EVENT_RULES_SERVICE.URL}/api/EventRules/${id}`,
        {
          headers: {
            'X-API-KEY': EVENT_RULES_SERVICE.API_KEY,
            'Content-Type': 'application/json'
          }
        });
      const data = await res.json();
      if (!data.success || !data.content){
        setIsEdit(false)
        console.log("No data found.")
        setRules()
      }
      else{
        const { eventId, ...currentRules } = data.content;
        setRules(currentRules)
        setIsEdit(true)
        console.log("Data found.")
      }
    }
    catch (error){
        console.error("Something went wrong when fetching data.")
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      if (isEdit === false){
        //POST
        const formData = {
          eventId: id,
          ...rules
        }
        const res = await fetch(`${EVENT_RULES_SERVICE.URL}/api/EventRules`, {
          method: 'POST',
          headers: {
            'X-API-KEY': EVENT_RULES_SERVICE.API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
          })
          if (res.ok) {
            console.log("Rules added.");
            console.log(res)
            closeModal();
          }
          else{
            console.error("Failed to add rules.", res)
          }
        }
        else{
          //PUT
          const formData = {
            eventId: id,
            ...rules
          }
          const res = await fetch(`${EVENT_RULES_SERVICE.URL}/api/EventRules`, {
            method: 'PUT',
              headers: {
                'X-API-KEY': EVENT_RULES_SERVICE.API_KEY,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          })
          if (res.ok) {
            console.log("Rules added.");
            console.log(res)
            closeModal();
          }
          else{
            console.error("Failed to add rules.", res)
          }
        }
    }
    catch (error){
      console.error("Something went wrong when submitting data.")
    }
  };

  useEffect(() => {
    getData();
  },[])

  
  return (
    <>
      <main className='modal-rules-main'>
        <div className='modal-rules-header'>
          <h6>Event Title</h6>
          <button className='btn btn-close-pink' onClick={() => closeModal()}>X</button>
        </div>

        <form onSubmit={handleSubmit} className='modal-rules-buttons'>
          {Object.entries(rules).map(([key]) => (
            <button type='button' key={key} className="modal-rules-btn"  onClick={() => setRules(prev => ({...prev, [key]: !prev[key] }))}>
              <img className={`modal-rules-image ${rules[key] ? "rules-big-img-modal" : "rules-small-img-modal"}`} src={`/images/rules-icons/${rules[key] ? "true" : "false"}/${key}.svg`} /> 
            </button>
          ))}
          <button className='btn btn-pink' type='submit'>Apply Rules</button>
        </form>
      </main>
    </>
  )
}

export default ModalEventRules