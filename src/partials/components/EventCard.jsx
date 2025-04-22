import React, { useEffect, useState } from 'react'

const EventCard = ({event}) => {
    const [imageUrl, setImageUrl] = useState("...");
    const [imageDescription, setImageDescription] = useState("...");

    //Will set the card image and description for now depending on the category that the event has.
    //Can turn this into a fetch or something to get images from a database online if someone wants to do that.
    function Setting_EventCardImage() {
      switch (event.category){
        case "Sport":
          setImageUrl("/public/images/event_card_images/football_gpt_image.png");
          setImageDescription("Image of a football.");
          break
        case "Music":
          setImageUrl("/public/images/event_card_images/music_gpt_image.png");
          setImageDescription("Image of a violin.");
          break
        case "Food":
          setImageUrl("/public/images/event_card_images/ramen_gpt_image.png");
          setImageDescription("Image of a bowl of ramen.");
          break
        default:
          setImageUrl("/public/images/error_images/no_image_found.jpg");
          setImageDescription("No image found.");
          break;
        }
    }
  
    //Runs everytime the category changes.
    useEffect(() => {
      Setting_EventCardImage();
    }, [event.category]);
    
    return (
        <>
            <div className='event-card'>
                <div className='event-card-header'>
                    <img className='event-card-image' src={imageUrl} alt={imageDescription} />
                    <span className='event-card-category'>{event.category} </span>
                </div>
                <div className='event-card-content'>
                    <p className='event-card-title'>{event.title}</p>
                    <p className='event-card-location'>{event.location}</p>
                    <div className='event-card-footer'>
                        <span className='event-card-date'><i className="fa-solid fa-calendar-days"></i>{event.date} </span>
                        <span className='event-card-price'><i className="fa-solid fa-dollar-sign"></i>{event.price} </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard