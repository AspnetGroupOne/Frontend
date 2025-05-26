import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../stylings/CreateBookingModal.css";

const CreateBookingModal = ({ event, onClose, onBookingCreated }) => {
  const [name, setName] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Diamond");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [voucher, setVoucher] = useState("");
  const [status, setStatus] = useState("Confirmed");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();



  const eventName = event?.name || "";
  const formattedDate = event?.date?.slice(0, 16) || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const booking = {
      name,
      event: eventName,
      ticketCategory,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      status,
      voucher,
      date: new Date(event.date).toISOString()
    };

    try {
      const response = await fetch("https://booking-api-service.azurewebsites.net/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
      });

      if (response.ok) {
        const createdBooking = await response.json();
        setMessage("✅ Booking created successfully!");
        setIsError(false);
        onBookingCreated(createdBooking);
        setTimeout(() => {
          setMessage(null);
          onClose();
          localStorage.setItem('highlightBookingId', createdBooking.id);

          navigate('/bookings');
        }, 2000);
      } else {
        const errorText = await response.text();
        setMessage(`❌ Error ${response.status}: ${errorText}`);
        setIsError(true);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setMessage("❌ Network or server error.");
      setIsError(true);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Boka Event</h2>

        {message && (
          <div className={`success-message ${isError ? "error" : ""}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ditt namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input type="text" value={eventName} readOnly />
          <input type="datetime-local" value={formattedDate} readOnly />

          <select value={ticketCategory} onChange={(e) => setTicketCategory(e.target.value)}>
            <option value="Diamond">Diamond</option>
            <option value="Platinum">Platinum</option>
            <option value="CAT 1">CAT 1</option>
          </select>

          <input
            type="number"
            placeholder="Pris"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Antal"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Voucher-kod"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="modal-buttons">
            <button type="submit" className="submit-button">Boka</button>
            <button type="button" className="cancel-button" onClick={onClose}>Avbryt</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
