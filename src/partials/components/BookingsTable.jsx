import React, { useState, useEffect } from 'react'
import CreateBookingModal from '../components/CreateBookingModal'
import EditBookingModal from '../components/EditBookingModal'
import '../../stylings/BookingsTable.css'

const BookingsTable = () => {
    const [filter, setFilter] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All Category')
    const [monthFilter, setMonthFilter] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [bookings, setBookings] = useState([])
    const [editingBooking, setEditingBooking] = useState(null)
    const [highlightedId, setHighlightedId] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [bookingToDelete, setBookingToDelete] = useState(null)

    // AI-genererad kod: Fetch-anropet för att hantera fel och sortera data
    useEffect(() => {
        fetch('https://booking-api-service.azurewebsites.net/api/Booking')
            .then((response) => response.json())
            .then((data) => {
                const sorted = data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                )
                setBookings(sorted)
                const newBookingId = localStorage.getItem('highlightBookingId')
                if (newBookingId) {
                    setHighlightedId(newBookingId)
                    localStorage.removeItem('highlightBookingId')
                    setTimeout(() => {
                        setHighlightedId(null)
                    }, 3000)
                }
            })
            .catch((error) =>
                console.error('Kunde inte hämta bokningar:', error)
            )
    }, [])

    const bookingsPerPage = 5

    const sortedBookings = [...bookings].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )

    // AI-genererad kod: Filtreringslogiken byggdes för att kombinera flera filter samtidigt
    const filteredBookings = sortedBookings

        .filter((b) => filter === 'All' || b.status === filter)
        .filter(
            (b) =>
                b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.event.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
            (b) =>
                categoryFilter === 'All Category' ||
                b.ticketCategory === categoryFilter
        )
        .filter((b) => {
            if (monthFilter === 'All') return true
            if (monthFilter === 'This Month') return true
            const bookingDate = new Date(b.date)
            const bookingMonthName = bookingDate.toLocaleString('default', {
                month: 'long'
            })
            return bookingMonthName === monthFilter
        })

    const startIndex = (currentPage - 1) * bookingsPerPage
    const endIndex = startIndex + bookingsPerPage
    const bookingsToShow = filteredBookings.slice(startIndex, endIndex)
    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [filter, searchTerm, categoryFilter, monthFilter])

    // AI-genererad kod: Delete-funktion skapades för att hantera användarbekräftelse och API-anrop
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this booking?'
        )
        if (!confirmed) return

        try {
            const response = await fetch(
                `https://booking-api-service.azurewebsites.net/api/Booking/${id}`,
                {
                    method: 'DELETE'
                }
            )

            if (response.ok) {
                setBookings((prev) => prev.filter((b) => b.id !== id))
                alert('Booking deleted!')
            } else {
                alert('Failed to delete booking.')
            }
        } catch (error) {
            console.error('Delete error:', error)
            alert('API error when deleting.')
        }
    }

    return (
        <div className="bookings-table-container">
            <div className="filters">
                {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
                    <button
                        key={status}
                        className={`filter-button ${
                            filter === status ? 'active' : ''
                        }`}
                        onClick={() => setFilter(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="search-and-filters">
                <input
                    type="text"
                    placeholder="Search name, event, etc"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="select-filters">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option>All Category</option>
                        <option>Diamond</option>
                        <option>Platinum</option>
                        <option>CAT 1</option>
                    </select>
                    <select
                        value={monthFilter}
                        onChange={(e) => setMonthFilter(e.target.value)}
                    >
                        <option>All</option>
                        <option>This Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                    </select>
                </div>
            </div>

            <table className="bookings-table">
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Event</th>
                        <th>Ticket Category</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>E-Voucher</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingsToShow.map((booking) => (

                        <tr
                            key={booking.id}
                            className={
                                highlightedId === booking.id
                                    ? 'highlighted-row'
                                    : ''
                            }
                        >
                            <td>{booking.id}</td>
                            <td>{new Date(booking.date).toLocaleString()}</td>
                            <td>{booking.name}</td>
                            <td>{booking.event}</td>
                            <td>
                                <span className="tag">
                                    {booking.ticketCategory}
                                </span>
                            </td>
                            <td>${booking.price}</td>
                            <td>{booking.quantity}</td>
                            <td>${booking.amount}</td>
                            <td>
                                <span
                                    className={`status ${booking.status.toLowerCase()}`}
                                >
                                    {booking.status}
                                </span>
                            </td>
                            <td>{booking.voucher || '-'}</td>
                            <td className="action-buttons">
                                <button
                                    className="edit-button"
                                    onClick={() => setEditingBooking(booking)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        setBookingToDelete(booking.id)
                                        setShowDeleteModal(true)
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <CreateBookingModal
                    onClose={() => setShowModal(false)}
                    onBookingCreated={(newBooking) => {
                        setBookings((prev) => [newBooking, ...prev])
                    }}
                />
            )}

            <div className="pagination">
                <span>
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, filteredBookings.length)} of{' '}
                    {filteredBookings.length}
                </span>
                <div className="page-buttons">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                    >
                        ◀
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={
                                currentPage === index + 1 ? 'active' : ''
                            }
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                    >
                        ▶
                    </button>
                </div>
            </div>

            {editingBooking && (
                <EditBookingModal
                    booking={editingBooking}
                    onClose={() => setEditingBooking(null)}
                    onBookingUpdated={(updated) => {
                        setBookings((prev) =>
                            prev.map((b) => (b.id === updated.id ? updated : b))
                        )
                    }}
                />
            )}

{showDeleteModal && (
  <div className="modal-overlay">
    <div className="delete-modal-content">
      <h3>Are you sure?</h3>
      <p>Do you want to delete this booking?</p>
      <div className="modal-buttons">
        <button
          className="delete-btn"
          onClick={async () => {
            try {
              const response = await fetch(`https://booking-api-service.azurewebsites.net/api/Booking/${bookingToDelete}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                setBookings((prev) => prev.filter((b) => b.id !== bookingToDelete));
              } else {
                alert('Failed to delete booking.');
              }
            } catch (error) {
              console.error('Delete error:', error);
              alert('API error when deleting.');
            } finally {
              setShowDeleteModal(false);
              setBookingToDelete(null);
            }
          }}
        >
          Yes, Delete
        </button>
        <button
          className="cancel-button"
          onClick={() => {
            setShowDeleteModal(false);
            setBookingToDelete(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

        </div>
    )
}

export default BookingsTable
