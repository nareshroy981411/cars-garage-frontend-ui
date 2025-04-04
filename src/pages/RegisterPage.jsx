import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import PublicNavbar from '../components/navbar/PublicNavbar';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const RegisterPage = () => {
  // EmailJS Configuration - Replace these with your actual credentials
  const EMAILJS_CONFIG = {
    // SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id',
    // TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id',
    // PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key'
    SERVICE_ID:'service_cnujddi',
  TEMPLATE_ID:'template_ynv49gh',
  PUBLIC_KEY:'Jje3Jo6il-Y4Xq8n7'
  };

  // State management
  const [formData, setFormData] = useState({
    userName: '',
    phone: '',
    email: '',
  });
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Generate 4-digit OTP
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle phone number changes
  const handlePhoneChange = (value) => {
    setFormData(prev => ({ 
      ...prev, 
      phone: value 
    }));
    
    if (formErrors.phone) {
      setFormErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.userName.trim()) {
      errors.userName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Send OTP email using EmailJS
  // const sendOtpEmail = async (email) => {
  //   try {
  //     const newOtp = generateOTP();
  //     setGeneratedOtp(newOtp);

  //     const templateParams = {
  //       to_email: email,
  //       otp_code: newOtp,
  //       user_name: formData.userName,
  //     };

  //     // Validate all required parameters
  //     if (!templateParams.to_email || !templateParams.otp_code) {
  //       throw new Error('Missing required email parameters');
  //     }

  //     const response = await emailjs.send(
  //       EMAILJS_CONFIG.SERVICE_ID,
  //       EMAILJS_CONFIG.TEMPLATE_ID,
  //       templateParams,
  //       EMAILJS_CONFIG.PUBLIC_KEY
  //     );

  //     if (response.status === 200) {
  //       const expiryTime = new Date();
  //       expiryTime.setMinutes(expiryTime.getMinutes() + 10);
  //       setOtpExpiry(expiryTime);
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error('EmailJS Error:', error);
      
  //     let errorMessage = 'Failed to send OTP. Please try again.';
  //     if (error.status === 422) {
  //       if (error.text.includes('recipients address is empty')) {
  //         errorMessage = 'Email address is required';
  //       } else if (error.text.includes('Invalid email address')) {
  //         errorMessage = 'Invalid email address format';
  //       }
  //     } else if (error.message.includes('Missing required')) {
  //       errorMessage = 'System error: Missing required fields';
  //     }
      
  //     toast.error(errorMessage);
  //     return false;
  //   }
  // };

  const sendOtpEmail = async (email) => {
    try {
      if (!email.trim()) {
        toast.error("Email is required before sending OTP.");
        return false;
      }
  
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
  
      const templateParams = {
        to_email: email, // Make sure this matches EmailJS template
        otp_code: newOtp,
        user_name: formData.userName,
      };
  
      console.log("Template Params:", templateParams); // Debugging
  
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
  
      if (response.status === 200) {
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 10);
        setOtpExpiry(expiryTime);
        return true;
      }
      return false;
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send OTP. Please check email and try again.");
      return false;
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!showOtpField) {
      // Validate all fields before sending OTP
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      const emailSent = await sendOtpEmail(formData.email);
      
      if (emailSent) {
        toast.success(`OTP sent to ${formData.email}`);
        setShowOtpField(true);
      }
    } else {
      // OTP Verification
      if (!otp.trim()) {
        toast.error('Please enter the OTP');
        setIsLoading(false);
        return;
      }

      if (otp.length !== 4) {
        toast.error('OTP must be 4 digits');
        setIsLoading(false);
        return;
      }

      if (otp === generatedOtp) {
        if (new Date() > otpExpiry) {
          toast.error('OTP has expired. Please request a new one.');
          setIsLoading(false);
          return;
        }

        // Registration successful
        dispatch(setCredentials({
          userName: formData.userName,
          email: formData.email,
          phone: formData.phone
        }));
        toast.success('Registration successful!');
        navigate('/brands');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    }
    setIsLoading(false);
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setIsLoading(true);
    const emailSent = await sendOtpEmail(formData.email);
    if (emailSent) {
      toast.success('New OTP sent!');
      setOtp('');
    } else {
      toast.error('Failed to resend OTP');
    }
    setIsLoading(false);
  };

  // Calculate remaining OTP time
  const calculateRemainingTime = () => {
    if (!otpExpiry) return 0;
    const now = new Date();
    return Math.max(0, Math.floor((otpExpiry - now) / 1000));
  };

  // Update remaining time every second
  useEffect(() => {
    if (!showOtpField || !otpExpiry) return;

    const timer = setInterval(() => {
      const time = calculateRemainingTime();
      setRemainingTime(time);
      if (time <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [showOtpField, otpExpiry]);

  return (
    <div className="min-h-screen bg-gray-100">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6" noValidate>
            {!showOtpField ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="userName">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    value={formData.userName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.userName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    required
                  />
                  {formErrors.userName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.userName}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Phone Number (with Country Code) <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="US"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    required
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="otp">
                    Enter OTP (sent to {formData.email}) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    inputMode="numeric"
                    pattern="\d{4}"
                    title="Please enter a 4-digit OTP"
                  />
                  {remainingTime > 0 ? (
                    <p className="text-sm text-gray-500 mt-1">
                      OTP expires in {Math.floor(remainingTime / 60)}:
                      {(remainingTime % 60).toString().padStart(2, '0')}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500 mt-1">
                      OTP has expired. Please request a new one.
                    </p>
                  )}
                </div>
              </>
            )}
            
            <button
              type="submit"
              disabled={isLoading || (showOtpField && remainingTime <= 0)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : showOtpField ? 'Verify OTP' : 'Send OTP to Email'}
            </button>

            {showOtpField && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={remainingTime > 0 || isLoading}
                  className="text-blue-600 hover:text-blue-800 text-sm disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Resend OTP {remainingTime > 0 && `(available in ${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')})`}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import PublicNavbar from '../components/navbar/PublicNavbar'
// import { registerUser, verifyOTP } from '../api/authAPI'
// import { toast } from 'react-hot-toast'
// import { useDispatch } from 'react-redux'
// import { setCredentials } from '../features/auth/authSlice'
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'
// import { parsePhoneNumberFromString } from 'libphonenumber-js'

// const countryPhoneLengths = {
//   IN: 10, // India
//   US: 10, // USA
//   UK: 10, // UK (example, actual UK lengths vary)
//   CA: 10, // Canada
//   AU: 9,  // Australia
//   // Add more countries as needed
// }

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     userName: '',
//     phone: '',
//     email: '',
//     country: ''
//   })
//   const [otp, setOtp] = useState('')
//   const [showOtpField, setShowOtpField] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handlePhoneChange = (value) => {
//     setFormData(prev => ({ ...prev, phone: value }))

//     // Validate phone number
//     if (value) {
//       const phoneNumber = parsePhoneNumberFromString(value)
//       if (phoneNumber) {
//         const countryCode = phoneNumber.country
//         setFormData(prev => ({ ...prev, country: countryCode }))
//       }
//     }
//   }

//   const isPhoneNumberValid = () => {
//     if (!formData.phone) return false

//     const phoneNumber = parsePhoneNumberFromString(formData.phone)
//     if (!phoneNumber) return false

//     const countryCode = phoneNumber.country
//     const expectedLength = countryPhoneLengths[countryCode]

//     return expectedLength ? phoneNumber.nationalNumber.length === expectedLength : true
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     if (!isPhoneNumberValid()) {
//       toast.error('Invalid phone number for selected country')
//       setIsLoading(false)
//       return
//     }

//     if (!showOtpField) {
//       try {
//         const response = await registerUser({
//           userName: formData.userName,
//           email: formData.email,
//           phone: formData.phone
//         })
//         toast.success(`OTP sent to ${formData.email}`)
//         setShowOtpField(true)
//       } catch (error) {
//         toast.error(error.message || 'Failed to send OTP')
//       } finally {
//         setIsLoading(false)
//       }
//     } else {
//       try {
//         const response = await verifyOTP(otp)
//         if (response.success) {
//           dispatch(setCredentials(response.data))
//           toast.success('Registration successful!')
//           navigate('/brands')
//         } else {
//           toast.error(response.message)
//         }
//       } catch (error) {
//         toast.error(error.message || 'OTP verification failed')
//       } finally {
//         setIsLoading(false)
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PublicNavbar />
      
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="px-6 py-4 bg-blue-600">
//             <h2 className="text-2xl font-bold text-white">Create Account</h2>
//           </div>
          
//           <form onSubmit={handleSubmit} className="p-6">
//             {!showOtpField ? (
//               <>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2" htmlFor="userName">
//                     Full Name
//                   </label>
//                   <input
//                     id="userName"
//                     name="userName"
//                     type="text"
//                     value={formData.userName}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2" htmlFor="email">
//                     Email Address
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-6">
//                   <label className="block text-gray-700 mb-2">
//                     Phone Number (with Country Code)
//                   </label>
//                   <PhoneInput
//                     international
//                     defaultCountry="IN"
//                     value={formData.phone}
//                     onChange={handlePhoneChange}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {formData.phone && !isPhoneNumberValid() && (
//                     <p className="text-red-500 text-sm mt-1">Invalid phone number for {formData.country}</p>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="mb-6">
//                 <label className="block text-gray-700 mb-2" htmlFor="otp">
//                   Enter OTP (sent to {formData.email})
//                 </label>
//                 <input
//                   id="otp"
//                   name="otp"
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             )}
            
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//             >
//               {isLoading ? 'Processing...' : showOtpField ? 'Verify OTP' : 'Send OTP to Email'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RegisterPage


// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import PublicNavbar from '../components/navbar/PublicNavbar'
// import { registerUser, verifyOTP } from '../api/authApi'
// import { toast } from 'react-hot-toast'
// import { useDispatch } from 'react-redux'
// import { setCredentials } from '../features/auth/authSlice'

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     userName: '',
//     mobile: '',
//     email: ''
//   })
//   const [otp, setOtp] = useState('')
//   const [showOtpField, setShowOtpField] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     if (!showOtpField) {
//       // Send OTP
//       try {
//         const response = await registerUser(formData)
//         toast.success(response.message)
//         setShowOtpField(true)
//       } catch (error) {
//         toast.error(error.message || 'Failed to send OTP')
//       } finally {
//         setIsLoading(false)
//       }
//     } else {
//       // Verify OTP
//       try {
//         const response = await verifyOTP(otp)
//         if (response.success) {
//           dispatch(setCredentials(response.data))
//           toast.success('Registration successful!')
//           navigate('/brands')
//         } else {
//           toast.error(response.message)
//         }
//       } catch (error) {
//         toast.error(error.message || 'OTP verification failed')
//       } finally {
//         setIsLoading(false)
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PublicNavbar />
      
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="px-6 py-4 bg-blue-600">
//             <h2 className="text-2xl font-bold text-white">Create Account</h2>
//           </div>
          
//           <form onSubmit={handleSubmit} className="p-6">
//             {!showOtpField ? (
//               <>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2" htmlFor="userName">
//                     Full Name
//                   </label>
//                   <input
//                     id="userName"
//                     name="userName"
//                     type="text"
//                     value={formData.userName}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2" htmlFor="mobile">
//                     Mobile Number
//                   </label>
//                   <input
//                     id="mobile"
//                     name="mobile"
//                     type="tel"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-6">
//                   <label className="block text-gray-700 mb-2" htmlFor="email">
//                     Email Address
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//               </>
//             ) : (
//               <div className="mb-6">
//                 <label className="block text-gray-700 mb-2" htmlFor="otp">
//                   Enter OTP (sent to {formData.mobile})
//                 </label>
//                 <input
//                   id="otp"
//                   name="otp"
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             )}
            
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//             >
//               {isLoading ? 'Processing...' : showOtpField ? 'Verify OTP' : 'Send OTP'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RegisterPage