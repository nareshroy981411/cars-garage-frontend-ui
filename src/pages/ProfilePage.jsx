import React from 'react'
import PrivateNavbar from '../components/navbar/PrivateNavbar'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <div className="min-h-screen bg-gray-100">
      <PrivateNavbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h2 className="text-2xl font-bold text-white">My Profile</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl text-gray-500">
                      {user?.userName?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Full Name</label>
                    <p className="font-medium">{user?.userName || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-600 mb-1">Email</label>
                    <p className="font-medium">{user?.email || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-600 mb-1">Mobile Number</label>
                    <p className="font-medium">{user?.mobile || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h3>
              
              <div className="space-y-4">
                <button className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
                  Edit Profile
                </button>
                
                <button className="w-full md:w-auto bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 ml-0 md:ml-4">
                  Change Password
                </button>
                
                <button className="w-full md:w-auto bg-red-100 text-red-600 py-2 px-6 rounded-lg hover:bg-red-200 ml-0 md:ml-4">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage