import React, { useState } from "react";
import "../../stylings/CreateBookingModal.css";

const CreateBookingModal = ({ onClose, onBookingCreated }) => {
  const [name, setName] = useState("");
  const [eventName, setEventName] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Diamond");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [voucher, setVoucher] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Confirmed");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
// AI-genererad kod: Bokningsobjektet och dess beräkningar (t.ex. belopp = pris * antal)
    const booking = {
      name,
      event: eventName,
      ticketCategory,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      amount: parseFloat(price) * parseInt(quantity),
      status,
      voucher,
      date: new Date(date).toISOString()
    };
// AI-genererad kod: API-anrop med felhantering och feedback-meddelanden
    try {
      const response = await fetch("https://localhost:7044/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
      });

      if (response.ok) {
        const createdBooking = await response.json();
        setMessage("Booking created successfully!");
        setIsError(false);
        onBookingCreated(createdBooking);
        setTimeout(() => {
          setMessage(null);
          onClose();
        }, 2000);
      } else {
        const errorText = await response.text();
        setMessage(`Error ${response.status}: ${errorText}`);
        setIsError(true);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setMessage("Network or server error.");
      setIsError(true);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Booking</h2>

        {message && (
          <div className={`success-message ${isError ? "error" : ""}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Event"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <select
            value={ticketCategory}
            onChange={(e) => setTicketCategory(e.target.value)}
          >
            <option value="Diamond">Diamond</option>
            <option value="Platinum">Platinum</option>
            <option value="CAT 1">CAT 1</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Voucher Code"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* ✅ Statusfält för att välja status */}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="modal-buttons">
            <button type="submit" className="submit-button">
              Create Booking
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
