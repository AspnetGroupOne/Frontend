import React from 'react'
import '../../../stylings/Evoucher.css'
import EventSchedule from '../../components/EventSchedule'
import EventRules from './../../components/EventRules';




const EVoucher = ({eventId}) => {
    
        
    return (
        <>
            <main className='evoucher-main'>

                <div className='evoucher-ticket'>

                </div>
                
                <div className='evoucher-left'>
                    <div className='evoucher-schedule'>
                        <EventSchedule id={eventId} />
                    </div>
                    <div className='evoucher-terms'>

                    </div>
                </div>

                <div className='evoucher-right'>
                    <div className='evoucher-venue-map'>

                    </div>
                    <div className='evoucher-rules'>
                        <EventRules id={eventId} />
                    </div>
                </div>

            </main>
        </>
    )
}

export default EVoucher