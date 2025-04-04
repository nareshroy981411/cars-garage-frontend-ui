import axios from "axios";

const API_URL = "http://localhost:8000";

// ✅ Fetch car brands
export const getCarBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/carmodels/search/`, {
      params: { query: "" }, // Pass an empty query for all brands
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching car brands:", error);
    throw error;
  }
};

// ✅ Fetch spare parts based on model name
export const getSpareParts = async (modelName) => {
  try {
    const response = await axios.get(`${API_URL}/spare-parts/`, {
      params: { model_name: modelName }, // ✅ Pass model name as a query parameter
    });
    console.log("Fetched spare parts:", response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error("Error fetching spare parts:", error);
    throw error;
  }
};

// ✅ Fetch part details by part ID
export const getPartDetails = async (partId) => {
  try {
    const response = await axios.get(`${API_URL}/spare-parts/${partId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching part details:", error);
    throw error;
  }
};



// import axios from 'axios'

// const API_URL = `http://localhost:8000/carmodels/search/?query=${query}`;

// export const getCarBrands = async () => {
//   const response = await axios.get(`${API_URL}`)
//   return response.data
// }

// export const getSpareParts = async (brandId) => {
//   const response = await axios.get(`${API_URL}/${brandId}/parts`)
//   return response.data
// }

// export const getPartDetails = async (partId) => {
//   const response = await axios.get(`${API_URL}/parts/${partId}`)
//   return response.data
// }