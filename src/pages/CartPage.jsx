import React from 'react'
import PrivateNavbar from '../components/navbar/PrivateNavbar'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice'
import { toast } from 'react-hot-toast'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

const CartPage = () => {
  const { items: cartItems, total } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleRemoveItem = (itemId, itemName) => {
    dispatch(removeFromCart(itemId))
    toast.success(`${itemName} removed from cart`)
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }))
    }
  }

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page
    toast.success('Proceeding to checkout')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PrivateNavbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="lg:flex gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <div key={item.id} className="p-4 md:flex items-center">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-32 object-contain"
                        />
                      </div>
                      
                      <div className="md:w-2/4 md:px-4">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                        <p className="text-blue-600 font-medium mt-2">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="md:w-1/4 flex items-center justify-between mt-4 md:mt-0">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="ml-4 text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 mt-6 lg:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="divide-y divide-gray-200">
                  <div className="pb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 mt-6"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-6">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Payment Options</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="border rounded-md p-2 hover:bg-gray-100">
                      <img src="/images/cash.png" alt="Cash" className="h-8 mx-auto" />
                    </button>
                    <button className="border rounded-md p-2 hover:bg-gray-100">
                      <img src="/images/credit-card.png" alt="Credit Card" className="h-8 mx-auto" />
                    </button>
                    <button className="border rounded-md p-2 hover:bg-gray-100">
                      <img src="/images/upi.png" alt="UPI" className="h-8 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Browse our catalog and add parts to your cart!</p>
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

export default CartPage