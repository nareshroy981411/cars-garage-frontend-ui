// src/api/authApi.js
import axios from 'axios';

const BASE_URL = "http://localhost:8000";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/register`, formData);
    console.log("Register response:", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      message: error.response?.data?.detail ||
        error.response?.data?.message ||
        'Registration failed. Please try again.'
    };
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/verify-otp`, {
      email,
      otp
    });
    return response.data;
  } catch (error) {
    console.error('OTP verification error:', error);
    return {
      success: false,
      message: error.response?.data?.detail ||
        error.response?.data?.message ||
        'OTP verification failed. Please try again.'
    };
  }
};


// // // src/api/authApi.js
// import axios from 'axios';

// const API_URL_Register = "http://localhost:8000/api/v1/auth/register";
// const API_URL_verify_otp = "http://localhost:8000/api/v1/auth/verify-otp";

// export const registerUser = async (userData) => {
//   console.log("Sending to backend:", userData); // Add this
//   try {
//     const response = await axios.post(API_URL_Register, userData);
//     return response.data;
//   } catch (error) {
//     console.error('Register API Error:', error.response?.data || error.message);
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to register user",
//     };
//   }
// };



// export const verifyOTP = async (email, enteredOTP) => {
//   try {
//     const response = await axios.post(API_URL_verify_otp, {
//       email,
//       otp: enteredOTP,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Verify OTP API Error:', error.response?.data || error.message);
//     return {
//       success: false,
//       message: error.response?.data?.message || "Invalid OTP",
//     };
//   }
// };


