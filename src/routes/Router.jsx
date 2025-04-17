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
import Layout from '../components/navbar/Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <Layout>
        <LandingPage />
        </Layout>
      </PublicRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Layout>
        <RegisterPage />
        </Layout>
      </PublicRoute>
    )
  },
  {
    path: '/brands',
    element: (
      <ProtectedRoute>
        <Layout>
        <CarBrandsPage />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/brand/:brandId/parts',
    element: (
      <ProtectedRoute>
        <Layout>
        <SparePartsPage />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/part/:partId',
    element: (
      <ProtectedRoute>
        <Layout>
        <PartDetailsPage />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/favorites',
    element: (
      <ProtectedRoute>
        <Layout>
        <FavoritesPage />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/cart',
    element: (
      <ProtectedRoute>
        <Layout>
        <CartPage />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Layout>
        <ProfilePage />
        </Layout>
      </ProtectedRoute>
    )
  }
])