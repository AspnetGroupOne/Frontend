import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiCheckSquare,
  FiFileText,
  FiMail,
  FiCalendar,
  FiTag,
  FiDollarSign,
  FiImage,
  FiStar,
  FiLogOut,
} from "react-icons/fi";
import "../../stylings/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <div className="logo">
          <img src="/images/sidebar-images/Ventixe-logo.svg" alt="Ventixe logo" />
        </div>

        <nav className="nav-menu">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiGrid /> Dashboard
          </NavLink>
          <NavLink to="/bookings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiCheckSquare /> Bookings
          </NavLink>
          <NavLink to="/invoices" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiFileText /> Invoices
          </NavLink>
          <NavLink to="/inbox" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiMail /> Inbox
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiCalendar /> Calendar
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiTag /> Events
          </NavLink>
          
          <NavLink to="/admin/events" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiTag /> Admin Events
          </NavLink>

          <NavLink to="/financials" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiDollarSign /> Financials
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiImage /> Gallery
          </NavLink>
          <NavLink to="/feedback" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FiStar /> Feedback
          </NavLink>
        </nav>

        <div className="upgrade-box">
          <img src="/images/sidebar-images/Illustration.svg" alt="Illustration" className="upgrade-image" />
          <p>Experience enhanced features and a smoother interface with the latest version of Ventixe</p>
          <button>Try New Version</button>
        </div>
      </div>

      <div className="sidebar-bottom">
        <a href="#" className="signout-btn">
          <FiLogOut /> Sign Out
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
