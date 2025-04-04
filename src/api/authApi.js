import axios from 'axios'

const API_URL = 'https://your-api-endpoint.com/api/auth'

// Mock OTP generation and verification
const generateOTP = () => Math.floor(1000 + Math.random() * 9000)

export const registerUser = async (userData) => {
  // In a real app, this would be an API call to send OTP to email
  const otp = generateOTP()
  localStorage.setItem('otp', otp.toString())
  localStorage.setItem('tempUser', JSON.stringify(userData))
  
  // Mock API response
  return { success: true, message: `OTP sent to ${userData.email}` }
}

export const verifyOTP = async (enteredOTP) => {
  const savedOTP = localStorage.getItem('otp')
  if (enteredOTP === savedOTP) {
    const userData = JSON.parse(localStorage.getItem('tempUser'))
    localStorage.removeItem('otp')
    localStorage.removeItem('tempUser')
    return { success: true, data: userData }
  }
  return { success: false, message: 'Invalid OTP' }
}

// import axios from 'axios'

// const API_URL = 'https://your-api-endpoint.com/api/auth'

// // Mock OTP generation and verification
// const generateOTP = () => Math.floor(1000 + Math.random() * 9000)

// export const registerUser = async (userData) => {
//   // In a real app, this would be an API call
//   const otp = generateOTP()
//   localStorage.setItem('otp', otp.toString())
//   localStorage.setItem('tempUser', JSON.stringify(userData))
  
//   // Mock API response
//   return { success: true, message: `OTP sent to ${userData.mobile}` }
// }

// export const verifyOTP = async (enteredOTP) => {
//   const savedOTP = localStorage.getItem('otp')
//   if (enteredOTP === savedOTP) {
//     const userData = JSON.parse(localStorage.getItem('tempUser'))
//     localStorage.removeItem('otp')
//     localStorage.removeItem('tempUser')
//     return { success: true, data: userData }
//   }
//   return { success: false, message: 'Invalid OTP' }
// }

