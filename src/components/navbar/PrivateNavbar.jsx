import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { toast } from 'react-hot-toast'

const PrivateNavbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/brands" className="flex items-center">
          <img src="/images/logo.png" alt="Car-Decores" className="h-10 mr-2" />
          <span className="text-xl font-bold text-blue-600">Car-Decores</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/cart" 
            className="flex items-center text-gray-700 hover:text-blue-600 relative"
          >
            <FaShoppingCart className="text-xl" />
            <span className="ml-1">Cart</span>
            {/* Cart count badge would go here */}
          </Link>
          
          <Link 
            to="/favorites" 
            className="flex items-center text-gray-700 hover:text-blue-600 relative"
          >
            <FaHeart className="text-xl" />
            <span className="ml-1">Favorites</span>
            {/* Favorites count badge would go here */}
          </Link>
          
          <Link 
            to="/profile" 
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <FaUser className="text-xl" />
            <span className="ml-1">Profile</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-600 ml-4"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="ml-1">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default PrivateNavbar