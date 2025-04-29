// src/pages/ProfilePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../features/auth/profileSlice';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import PrivateNavbar from '../components/navbar/PrivateNavbar';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.profile);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/register');
    } else {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, navigate]);

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PrivateNavbar />
      <div className="container mx-auto p-6 max-w-3xl">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>
          <div className="flex gap-8 mb-6">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <span className="text-4xl text-gray-500">{user?.username?.[0]}</span>
              )}
            </div>
            <div>
              <p className="font-semibold">Name: <span className="font-normal">{user?.username}</span></p>
              <p className="font-semibold">Email: <span className="font-normal">{user?.email}</span></p>
              <p className="font-semibold">Phone: <span className="font-normal">{user?.phone_number}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import PrivateNavbar from '../components/navbar/PrivateNavbar';
// import { selectToken } from '../features/auth/authSlice';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const reduxToken = useSelector(selectToken);
//   const token = reduxToken || localStorage.getItem('token');
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const handleClose = () => {
//     navigate('/brands'); // Update to your desired path
//   };

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get('http://localhost:8000/login/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setProfile(res.data);
//     } catch (err) {
//       console.error('Failed to fetch profile:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchProfile();
//     } else {
//       navigate('/register');
//     }
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-lg text-gray-600">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PrivateNavbar />

//       <div className="container mx-auto px-4 py-12">
//         <div className="relative max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//           <button
//             onClick={handleClose}
//             className="absolute top-3 right-3 text-gray-300 hover:text-red-500 text-2xl font-bold"
//             title="Close"
//           >
//             &times;
//           </button>

//           <div className="px-6 py-4 bg-blue-600">
//             <h2 className="text-2xl font-bold text-white">My Profile</h2>
//           </div>

//           <div className="p-6">
//             <div className="flex flex-col md:flex-row gap-8 mb-8">
//               <div className="md:w-1/3 flex justify-center">
//                 <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                   {profile?.avatar ? (
//                     <img
//                       src={profile.avatar}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-4xl text-gray-500">
//                       {profile?.username?.charAt(0).toUpperCase()}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="md:w-2/3">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                   Personal Information
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-600 mb-1">Full Name</label>
//                     <p className="font-medium">{profile?.username || 'Not provided'}</p>
//                   </div>

//                   <div>
//                     <label className="block text-gray-600 mb-1">Email</label>
//                     <p className="font-medium">{profile?.email || 'Not provided'}</p>
//                   </div>

//                   <div>
//                     <label className="block text-gray-600 mb-1">Mobile Number</label>
//                     <p className="font-medium">{profile?.phone_number || 'Not provided'}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;