import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegisterPage from '../pages/RegisterPage'
import CarBrandsPage from '../pages/CarBrandsPage'
import SparePartsPage from '../pages/SparePartsPage'
import PartDetailsPage from '../pages/PartDetailsPage'
import FavoritesPage from '../pages/FavoritesPage'
import CartPage from '../pages/CartPage'
import ProfilePage from '../pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    )
  },
  {
    path: '/brands',
    element: (
      <ProtectedRoute>
        <CarBrandsPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/brand/:brandId/parts',
    element: (
      <ProtectedRoute>
        <SparePartsPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/part/:partId',
    element: (
      <ProtectedRoute>
        <PartDetailsPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/favorites',
    element: (
      <ProtectedRoute>
        <FavoritesPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/cart',
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    )
  }
])