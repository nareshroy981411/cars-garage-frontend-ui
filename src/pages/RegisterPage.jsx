import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicNavbar from '../components/navbar/PublicNavbar'
import { registerUser, verifyOTP } from '../api/authApi'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    mobile: '',
    email: ''
  })
  const [otp, setOtp] = useState('')
  const [showOtpField, setShowOtpField] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (!showOtpField) {
      // Send OTP
      try {
        const response = await registerUser(formData)
        toast.success(response.message)
        setShowOtpField(true)
      } catch (error) {
        toast.error(error.message || 'Failed to send OTP')
      } finally {
        setIsLoading(false)
      }
    } else {
      // Verify OTP
      try {
        const response = await verifyOTP(otp)
        if (response.success) {
          dispatch(setCredentials(response.data))
          toast.success('Registration successful!')
          navigate('/brands')
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        toast.error(error.message || 'OTP verification failed')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {!showOtpField ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="userName">
                    Full Name
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="mobile">
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="otp">
                  Enter OTP (sent to {formData.mobile})
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : showOtpField ? 'Verify OTP' : 'Send OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage