import React, { useState } from 'react';
import { createEvent } from '../../services/eventService';

export default function EventForm() {
  const [form, setForm] = useState({
  title: '',
  location: '',
  date: '',
  description: '',
  ticketsAvailable: '' 
});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulärdata som skickas:", form);
    if (!form.ticketsAvailable || isNaN(form.ticketsAvailable) || Number(form.ticketsAvailable) < 0) {
       alert('Ange ett giltigt antal biljetter!');
   return;
}

    await createEvent({
  EventName: form.title,
  EventLocation: form.location,
  EventDate: form.date,
  EventDescription: form.description,
  TicketsAvailable: Number(form.ticketsAvailable)

});
    alert('Event skapades!');
  };

  return (
  <form onSubmit={handleSubmit} className="space-y-4 bg-purple-200 p-4 rounded-lg">
    <input name="title" placeholder="Titel" className="w-full p-2" onChange={handleChange} />
    <input name="location" placeholder="Plats" className="w-full p-2" onChange={handleChange} />
    <input name="date" type="date" className="w-full p-2" onChange={handleChange} />
    <textarea name="description" placeholder="Beskrivning" className="w-full p-2" onChange={handleChange}></textarea>
    
    
    <input
      name="ticketsAvailable"
      type="number"
      placeholder="Antal biljetter"
      className="w-full p-2"
      min="1"
      onChange={handleChange}
    />

    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Skapa event</button>
  </form>
);
}
