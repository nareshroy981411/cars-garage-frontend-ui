import React, { useState, useEffect } from 'react'
import PrivateNavbar from '../components/navbar/PrivateNavbar'
import { getCarBrands } from '../api/carApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const CarBrandsPage = () => {
  const [brands, setBrands] = useState([])
  const [filteredBrands, setFilteredBrands] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getCarBrands()
        setBrands(data)
        setFilteredBrands(data)
      } catch (error) {
        toast.error('Failed to load car brands')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchBrands()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      ); // ✅ Close the filter function here
      setFilteredBrands(filtered); // ✅ Now call setFilteredBrands
    }
  }, [searchTerm, brands]);

  const handleBrandSelect = (brandId) => {
    navigate(`/brand/${brandId}/parts`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <PrivateNavbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading car brands...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PrivateNavbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Select Your Car Brand</h1>
          
          <div className="relative max-w-md mb-6">
            <input
              type="text"
              placeholder="Search car brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBrands.map(brand => (
              <button
                key={brand.id}
                onClick={() => handleBrandSelect(brand.id)}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="w-16 h-16 object-contain mb-2"
                />
                <span className="font-medium text-gray-800">{brand.name}</span>
              </button>
            ))}
          </div>
          
          {filteredBrands.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No car brands found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CarBrandsPage