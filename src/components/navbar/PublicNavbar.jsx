// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FaUserPlus } from 'react-icons/fa'

// const PublicNavbar = () => {
//   return (
//     <nav className="bg-white shadow-md fixed w-full z-10">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="flex items-center">
//           <img src="/images/logo.png" alt="Car-Decores" className="h-10 mr-2" />
//           <span className="text-xl font-bold text-blue-600">Car-Decores</span>
//         </Link>
        
//         <div className="flex items-center space-x-4">
//           <Link 
//             to="/register" 
//             className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             <FaUserPlus className="mr-2" />
//             Register
//           </Link>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default PublicNavbar

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
// import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/images/logo2.jpg'
// import logo3 from '../../assets/images/logo3.png'

const PublicNavbar = () => {
  const navigate = useNavigate();
 
  return (
    <nav className="bg-[#030d17] shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img 
            src={logo2} 
            alt="Logo" 
            className="h-10 mr-2"
          />
          <span className="text-xl font-bold text-blue-600">Car-Decores</span>
        </div>
        
        <button
          onClick={() => navigate('/register')}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaUserPlus className="mr-2" />
          Register
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;