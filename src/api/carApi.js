import axios from 'axios'

const API_URL = 'https://your-api-endpoint.com/api/cars'

export const getCarBrands = async () => {
  const response = await axios.get(`${API_URL}/brands`)
  return response.data
}

export const getSpareParts = async (brandId) => {
  const response = await axios.get(`${API_URL}/${brandId}/parts`)
  return response.data
}

export const getPartDetails = async (partId) => {
  const response = await axios.get(`${API_URL}/parts/${partId}`)
  return response.data
}