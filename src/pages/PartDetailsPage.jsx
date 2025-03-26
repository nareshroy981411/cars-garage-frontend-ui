import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PrivateNavbar from '../components/navbar/PrivateNavbar'
import { getPartDetails } from '../api/carApi'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice'
import { FaHeart, FaRegHeart, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'

const PartDetailsPage = () => {
  const { partId } = useParams()
  const [part, setPart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites.items)

  const isFavorite = favorites.some(item => item.id === part?.id)

  useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        const data = await getPartDetails(partId)
        setPart(data)
      } catch (error) {
        toast.error('Failed to load part details')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPartDetails()
  }, [partId])

  const handleAddToCart = () => {
    if (part) {
      dispatch(addToCart({ ...part, quantity }))
      toast.success(`${quantity} ${part.name} added to cart`)
    }
  }

  const handleToggleFavorite = () => {
    if (part) {
      if (isFavorite) {
        dispatch(removeFromFavorites(part.id))
        toast.success(`${part.name} removed from favorites`)
      } else {
        dispatch(addToFavorites(part))
        toast.success(`${part.name} added to favorites`)
      }
    }
  }

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1 && newQuantity <= (part?.stock || 1)) {
      setQuantity(newQuantity)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <PrivateNavbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading part details...</p>
        </div>
      </div>
    )
  }

  if (!part) {
    return (
      <div className="min-h-screen bg-gray-100">
        <PrivateNavbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Part not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PrivateNavbar />
      
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Parts
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <img 
                src={part.image} 
                alt={part.name} 
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
            
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-800">{part.name}</h1>
                <button
                  onClick={handleToggleFavorite}
                  className="p-2 text-xl"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-600" />
                  )}
                </button>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  ${part.price.toFixed(2)}
                </span>
                <span className={`ml-4 text-sm ${part.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {part.stock > 0 ? `${part.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-600">{part.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Specifications</h2>
                <ul className="grid grid-cols-2 gap-2 text-gray-600">
                  <li><span className="font-medium">Brand:</span> {part.brand}</li>
                  <li><span className="font-medium">Part Number:</span> {part.partNumber}</li>
                  <li><span className="font-medium">Compatibility:</span> {part.compatibility}</li>
                  <li><span className="font-medium">Warranty:</span> {part.warranty}</li>
                </ul>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center border rounded-md mr-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1 text-xl disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= part.stock}
                    className="px-3 py-1 text-xl disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={part.stock <= 0}
                  className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg ${part.stock > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart (${(part.price * quantity).toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartDetailsPage