import React, { useState, useEffect } from "react";
import "../../stylings/CreateBookingModal.css";

const EditBookingModal = ({ booking, onClose, onBookingUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    event: "",
    ticketCategory: "Diamond",
    price: "",
    quantity: "",
    voucher: "",
    date: "",
    status: "Confirmed"
  });

  const [message, setMessage] = useState("");
// AI-genererad kod: Formuläret fylls automatiskt med bokningsdata när modalen öppnas
  useEffect(() => {
    if (booking) {
      setFormData({
        name: booking.name,
        event: booking.event,
        ticketCategory: booking.ticketCategory,
        price: booking.price,
        quantity: booking.quantity,
        voucher: booking.voucher,
        date: booking.date?.slice(0, 16),
        status: booking.status
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBooking = {
      name: formData.name,
      event: formData.event,
      ticketCategory: formData.ticketCategory,
      price: parseFloat(formData.price.toString().replace(',', '.')),
      quantity: parseInt(formData.quantity),
      status: formData.status,
      voucher: formData.voucher,
      date: formData.date
    };
// AI-genererad kod: PUT-anrop till backend med felhantering och automatiskt stängning av modalen efter uppdatering
    try {
      const response = await fetch(`https://localhost:7044/api/booking/${booking.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedBooking)
      });

      if (response.ok) {
        onBookingUpdated({ ...booking, ...updatedBooking });
        setMessage("✅ Booking updated successfully!");

        setTimeout(() => {
          setMessage("");
          onClose();
        }, 4000);
      } else {
        setMessage("❌ Failed to update booking.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("❌ Could not connect to API.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Booking</h2>

        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="event" type="text" placeholder="Event" value={formData.event} onChange={handleChange} required />

          <select name="ticketCategory" value={formData.ticketCategory} onChange={handleChange}>
            <option value="Diamond">Diamond</option>
            <option value="Platinum">Platinum</option>
            <option value="CAT 1">CAT 1</option>
          </select>

          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          <input name="voucher" type="text" placeholder="Voucher Code" value={formData.voucher} onChange={handleChange} />
          <input name="date" type="datetime-local" value={formData.date} onChange={handleChange} required />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="modal-buttons">
            <button type="submit" className="submit-button">Save</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
