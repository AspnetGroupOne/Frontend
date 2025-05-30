import React, { useEffect, useState } from 'react'
import EventRuleItem from './EventRuleItem'
import '../../stylings/RulesComp.css'
import { EVENT_RULES_SERVICE } from '../../utils/serviceConfig';


const EventRules = ({ id, reloadData }) => {
    const [arrayOfItems, setArrayOfItems] = useState([])

    const getData = async () => {
        //Kept getting 24 items instead of 12, this fixed that.
        const arrayOfItems = []
        try{
            const res = await fetch(`${EVENT_RULES_SERVICE.URL}/api/EventRules/${id}`,
        {
          headers: {
            'X-API-KEY': EVENT_RULES_SERVICE.API_KEY,
            'Content-Type': 'application/json'
          }
        });
            const data = await res.json();
            if (!data.success)
                console.log("No rules found.")
            else{
                //Turning the all the object, except eventid, to an array to be able to map.
                Object.entries(data.content).forEach(([key, value]) => {
                    if (key !== "eventId")
                        {
                            arrayOfItems.push({key, value})
                        }
                })
                setArrayOfItems(arrayOfItems)
                console.log(arrayOfItems);
            }
        }
        catch (error){
            console.error("Something went wrong when fetching the rules.")
        }
    }

    //Runs atleast once and will reload the data when the modal is closed.
    useEffect(() => {
        getData()
    }, [reloadData])

    return (
        <>
            <div className='rules-component-wrapper'>
                <header className='rules-component-header'>
                    <h6>Allowed / Prohibited items</h6>
                    {/* Going to be used to add a small modal where you can send a delete request of the information. */}
                    <i className="fa-light fa-ellipsis"></i>
                </header>
                <section className='rules-component-image-section'>
                    {arrayOfItems.map(object => <EventRuleItem key={object.key} object={object}/> ) }
                </section>
            </div>
        </>
    )
}

export default EventRules