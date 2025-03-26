import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PrivateNavbar from '../components/navbar/PrivateNavbar'
import { getSpareParts } from '../api/carApi'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice'
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'

const SparePartsPage = () => {
  const { brandId } = useParams()
  const [parts, setParts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [brandName, setBrandName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const data = await getSpareParts(brandId)
        setParts(data.parts)
        setBrandName(data.brandName)
      } catch (error) {
        toast.error('Failed to load spare parts')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSpareParts()
  }, [brandId])

  const handleAddToCart = (part) => {
    dispatch(addToCart(part))
    toast.success(`${part.name} added to cart`)
  }

  const handleToggleFavorite = (part) => {
    if (part.isFavorite) {
      dispatch(removeFromFavorites(part.id))
      toast.success(`${part.name} removed from favorites`)
    } else {
      dispatch(addToFavorites(part))
      toast.success(`${part.name} added to favorites`)
    }
  }

  const handleViewDetails = (partId) => {
    navigate(`/part/${partId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <PrivateNavbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading spare parts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PrivateNavbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Spare Parts for {brandName}
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {parts.map(part => (
            <div key={part.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={part.image} 
                  alt={part.name} 
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleViewDetails(part.id)}
                />
                <button
                  onClick={() => handleToggleFavorite(part)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  aria-label={part.isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {part.isFavorite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-600" />
                  )}
                </button>
              </div>
              
              <div className="p-4">
                <h3 
                  className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:text-blue-600"
                  onClick={() => handleViewDetails(part.id)}
                >
                  {part.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{part.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-blue-600">${part.price.toFixed(2)}</span>
                  <span className={`text-sm ${part.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {part.stock > 0 ? `${part.stock} in stock` : 'Out of stock'}
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
        
        {parts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No spare parts available for this brand.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SparePartsPage