import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from './../partials/layouts/AuthLayout';
import PortalLayout from './../partials/layouts/PortalLayout';

const NotFound = lazy(() => import('./../partials/pages/Notfound'))

const SignIn = lazy(() => import('./../partials/pages/auth/SignIn'))
const SignUp = lazy(() => import('./../partials/pages/auth/SignUp'))
const Unauthorized = lazy(() => import('./../partials/pages/auth/Unauthorized'))

const UserDashboard = lazy(() => import('./../partials/pages/user/Dashboard'))
const UserBookings = lazy(() => import('./../partials/pages/user/Bookings'))
const UserEVoucher = lazy(() => import('./../partials/pages/user/EVoucher'))
    
const AdminDashboard = lazy(() => import('./../partials/pages/admin/Dashboard'))
const AdminBookings = lazy(() => import('./../partials/pages/admin/Bookings'))
const AdminEventDetails = lazy(() => import('./../partials/pages/admin/EventDetails'))
const AdminEvents = lazy(() => import('./../partials/pages/admin/AdminEvents'))

const PublicEvents = lazy(() => import('./../partials/pages/user/PublicEvents'));

export const routes = [
  {
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> }
    ]
  },
  {
    layout: AuthLayout,
    children: [
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/denied', element: <Unauthorized /> }
    ]
  },
  {
    layout: PortalLayout,
    protected: true,
    children: [
      { path: '/dashboard', element: <UserDashboard /> },
      { path: '/bookings', element: <UserBookings /> },
      { path: '/evoucher', element: <UserEVoucher /> },
      { path: '/events', element: <PublicEvents /> } // Utan "protected"

    ]
  },
  {
    layout: PortalLayout,
    protected: true,
    adminOnly: true,
    children: [
      { path: '/admin/dashboard', element: <AdminDashboard /> },
      { path: '/admin/bookings', element: <AdminBookings /> },
      { path: '/admin/events', element: <AdminEvents /> },
      { path: '/admin/eventDetails', element: <AdminEventDetails /> }
    ]
  },
  {
    children: [
      { path: '/events', element: <PublicEvents /> }
    ]
  },
  {
    children: [
      { path: '*', element: <NotFound /> }
    ]
  }
];
