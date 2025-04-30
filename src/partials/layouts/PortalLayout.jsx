import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import '../../stylings/Sidebar.css';
import '../../stylings/PortalLayout.css';
import Footer from './../components/Footer';

const PortalLayout = () => {
  return (
    <div className="portal-layout">
    <Sidebar />
    <main className="portal-main">
      <Outlet />
    </main>
    <Footer />
  </div>
  )
}

export default PortalLayout
