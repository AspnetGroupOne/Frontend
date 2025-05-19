import React, { useEffect, useState } from 'react';
import EventForm from '../../components/EventForm';
import { getEvents } from '../../../services/eventService';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Fel vid hämtning av events:', err);
        setError('Det gick inte att hämta events. Försök igen senare.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin: Events</h1>
      <EventForm />
      <hr className="my-6" />
      
      {loading && <p>Laddar events...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <ul className="space-y-4">
        {events.length === 0 && !loading && <p>Inga events tillgängliga just nu.</p>}
        
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded-lg bg-purple-100">
            <strong>{event.title}</strong><br />
            {event.date} — {event.location}<br />
            <em>{event.description}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
