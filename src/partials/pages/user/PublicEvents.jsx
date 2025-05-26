import { useEffect, useState } from 'react'
import CreateBookingModal from '../../components/CreateBookingModal'

export default function PublicEvents() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const apiUrl =
        'https://eventbookingsystem20250526120605-azd2dcckf0guhzde.swedencentral-01.azurewebsites.net/api/events'

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(apiUrl)
                const data = await response.json()
                setEvents(data)
            } catch (error) {
                console.error('Kunde inte hämta event:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    if (loading) return <p>Laddar event...</p>

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Alla Event</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">
                                {event.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {event.date}
                            </p>
                            <p className="mt-2 text-gray-800">
                                {event.description}
                            </p>
                        </div>
                        <button
                            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
                            onClick={() => {
                                setSelectedEvent(event)
                                setShowModal(true)
                            }}
                        >
                            Boka
                        </button>
                    </div>
                ))}
            </div>
            {showModal && selectedEvent && (
        <CreateBookingModal
          event={selectedEvent}
          onClose={() => {
            setShowModal(false);
            setSelectedEvent(null);
          }}
          onBookingCreated={(booking) => {
            console.log("Booking sent", booking);
          }}
        />
      )}
        </div>
    )
}
