import React from 'react'
import PrivateNavbar from '../components/navbar/PrivateNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromFavorites } from '../features/favorites/favoritesSlice'
import { addToCart } from '../features/cart/cartSlice'
import { toast } from 'react-hot-toast'
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites.items)
  const dispatch = useDispatch()
    const navigate = useNavigate();

  const handleRemoveFavorite = (partId, partName) => {
    dispatch(removeFromFavorites(partId))
    toast.success(`${partName} removed from favorites`)
  }

  const handleAddToCart = (part) => {
    dispatch(addToCart(part))
    toast.success(`${part.name} added to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <PrivateNavbar />
      
      <div className="container mx-auto px-4 py-12 ">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Favorite Parts</h1> */}
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(part => (
              <div key={part.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={part.image} 
                    alt={part.name} 
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFavorite(part.id, part.name)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 text-red-500"
                    aria-label="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{part.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{part.description}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-blue-600">${part.price.toFixed(2)}</span>
                    <span className={`text-sm ${part.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {part.stock > 0 ? 'In stock' : 'Out of stock'}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(part)}
                    disabled={part.stock <= 0}
                    className={`w-full flex items-center justify-center py-2 px-4 rounded-lg ${part.stock > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-white rounded-full shadow-md mb-4">
              <FaHeart className="text-4xl text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your favorites list is empty</h2>
            <p className="text-gray-600 mb-6">Browse our catalog and add parts to your favorites!</p>
            <button
              onClick={() => navigate('/brands')}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Browse Parts
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage