import React, { useState } from 'react';
import { createEvent } from '../../services/eventService';

export default function EventForm() {
  const [form, setForm] = useState({
    title: '',
    location: '',
    date: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulärdata som skickas:", form);
    if (!form.title || !form.location || !form.date || !form.description) {
      alert('Alla fält måste fyllas i!');
      return;
    }
    await createEvent({
  EventName: form.title,
  EventLocation: form.location,
  EventDate: form.date,
  Description: form.description
});
    alert('Event skapades!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-purple-200 p-4 rounded-lg">
      <input name="title" placeholder="Titel" className="w-full p-2" onChange={handleChange} />
      <input name="location" placeholder="Plats" className="w-full p-2" onChange={handleChange} />
      <input name="date" type="date" className="w-full p-2" onChange={handleChange} />
      <textarea name="description" placeholder="Beskrivning" className="w-full p-2" onChange={handleChange}></textarea>
      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Skapa event</button>
    </form>
  );
}
