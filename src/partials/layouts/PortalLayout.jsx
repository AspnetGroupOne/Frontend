import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import '../../stylings/Sidebar.css';
import '../../stylings/PortalLayout.css';

const PortalLayout = () => {
  return (
    <div className="portal-layout">
    <Sidebar />
    <main className="portal-main">
      <Outlet />
    </main>
  </div>
  )
}

export default PortalLayout
