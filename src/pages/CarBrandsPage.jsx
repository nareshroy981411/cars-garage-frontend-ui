import React, { useState, useEffect } from "react";
import PrivateNavbar from "../components/navbar/PrivateNavbar";
import { getCarBrands } from "../api/carApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CarBrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const data = await getCarBrands();
        console.log("Car data fetched:", data);

        // ✅ Store full data (brands + models)
        setBrands(data);
        setFilteredResults(data);
      } catch (error) {
        toast.error("Failed to load car brands");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarBrands();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults(brands);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const modelMatch = brands.find(car => car.model_name.toLowerCase() === lowerSearch);

      if (modelMatch) {
        setFilteredResults([modelMatch]); // ✅ Show only the exact model
      } else {
        const brandFiltered = brands.filter(car =>
          car.company_brand.toLowerCase().includes(lowerSearch)
        );
        setFilteredResults(brandFiltered);
      }
    }
  }, [searchTerm, brands]);

  const handleSelect = (car) => {
    navigate(`/brand/${car.company_brand}/model/${car.model_name}/parts`, {
      state: { brandName: car.company_brand, modelName: car.model_name },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 text-center">
        <PrivateNavbar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading car data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PrivateNavbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Car Brand / Model</h1>

        <input
          type="text"
          placeholder="Search brand or exact model name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredResults.map(car => (
            <button
              key={car.id}
              onClick={() => handleSelect(car)}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
            >
              {car.brand_image_url ? (
                <img
                  src={car.brand_image_url}
                  alt={car.company_brand}
                  className="w-16 h-16 object-contain mb-2"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2">
                  <span className="text-xl font-bold text-gray-500">
                    {car.company_brand.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-medium text-gray-800">{car.company_brand} - {car.model_name}</span>
            </button>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No matching brand or model found.</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBrandsPage;



// import React, { useState, useEffect } from "react";
// import PrivateNavbar from "../components/navbar/PrivateNavbar";
// import { getCarBrands } from "../api/carApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const CarBrandsPage = () => {
//   const [brands, setBrands] = useState([]);
//   const [filteredBrands, setFilteredBrands] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCarBrands = async () => {
//       try {
//         const data = await getCarBrands();
//         console.log("Car brands fetched:", data);

//         // ✅ Extract unique brands and their models
//         const uniqueBrands = Array.from(new Set(data.map(item => item.company_brand))).map(brand => ({
//           id: brand.toLowerCase().replace(/\s+/g, "-"),
//           name: brand,
//           logo: data.find(item => item.company_brand === brand)?.brand_image_url || null,
//           models: data.filter(item => item.company_brand === brand).map(item => item.model_name) // ✅ Store models under brand
//         }));

//         setBrands(uniqueBrands);
//         setFilteredBrands(uniqueBrands);
//       } catch (error) {
//         toast.error("Failed to load car brands");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCarBrands();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredBrands(brands);
//     } else {
//       const filtered = brands.filter(brand =>
//         brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         brand.models.some(model => model.toLowerCase().includes(searchTerm.toLowerCase())) // ✅ Match model names too
//       );
//       setFilteredBrands(filtered);
//     }
//   }, [searchTerm, brands]);

//   const handleBrandSelect = (brandId) => {
//     const brand = brands.find(b => b.id === brandId);
//     if (brand) {
//       navigate(`/brand/${brandId}/parts`, { state: { brandName: brand.name } });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <PrivateNavbar />
//         <div className="container mx-auto px-4 py-12 text-center">
//           <div className="flex justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//           <p className="mt-4">Loading car brands...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PrivateNavbar />

//       <div className="container mx-auto px-4 py-12">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Select Your Car Brand</h1>

//           <div className="relative max-w-md mb-6">
//             <input
//               type="text"
//               placeholder="Search by brand or model name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {filteredBrands.map(brand => (
//               <button
//                 key={brand.id}
//                 onClick={() => handleBrandSelect(brand.id)}
//                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
//               >
//                 {brand.logo ? (
//                   <img
//                     src={brand.logo}
//                     alt={brand.name}
//                     className="w-16 h-16 object-contain mb-2"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2">
//                     <span className="text-xl font-bold text-gray-500">
//                       {brand.name.charAt(0)}
//                     </span>
//                   </div>
//                 )}
//                 <span className="font-medium text-gray-800">{brand.name}</span>

//                 {/* ✅ Show models under each brand */}
//                 <ul className="text-sm text-gray-600 mt-2">
//                   {brand.models.slice(0, 3).map((model, index) => (
//                     <li key={index}>• {model}</li>
//                   ))}
//                   {brand.models.length > 3 && <li>+ More</li>}
//                 </ul>
//               </button>
//             ))}
//           </div>

//           {filteredBrands.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-600">No matching brands or models found.</p>
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="mt-2 text-blue-600 hover:text-blue-800"
//               >
//                 Clear search
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarBrandsPage;



// import React, { useState, useEffect } from "react";
// import PrivateNavbar from "../components/navbar/PrivateNavbar";
// import { getCarBrands } from "../api/carApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const CarBrandsPage = () => {
//   const [brands, setBrands] = useState([]);
//   const [filteredBrands, setFilteredBrands] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCarBrands = async () => {
//       try {
//         const data = await getCarBrands();
//         console.log("Car brands fetched:", data); // ✅ Debugging log

//         // ✅ Extract unique brands from car models
//         const uniqueBrands = Array.from(
//           new Set(data.map((item) => item.company_brand))
//         ).map((brand) => ({
//           id: brand.toLowerCase().replace(/\s+/g, "-"),
//           name: brand,
//           logo: data.find((item) => item.company_brand === brand)?.brand_image_url || null,
//         }));

//         setBrands(uniqueBrands);
//         setFilteredBrands(uniqueBrands);
//       } catch (error) {
//         toast.error("Failed to load car brands");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCarBrands();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredBrands(brands);
//     } else {
//       const filtered = brands.filter((brand) =>
//         brand.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBrands(filtered);
//     }
//   }, [searchTerm, brands]);

//   const handleBrandSelect = (brandId) => {
//     const brand = brands.find((b) => b.id === brandId);
//     if (brand) {
//       navigate(`/brand/${brandId}/parts`, { state: { brandName: brand.name } });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <PrivateNavbar />
//         <div className="container mx-auto px-4 py-12 text-center">
//           <div className="flex justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//           <p className="mt-4">Loading car brands...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PrivateNavbar />

//       <div className="container mx-auto px-4 py-12">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Select Your Car Brand</h1>

//           <div className="relative max-w-md mb-6">
//             <input
//               type="text"
//               placeholder="Search car brands..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <span className="absolute right-3 top-2.5 text-gray-400">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </span>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {filteredBrands.map((brand) => (
//               <button
//                 key={brand.id}
//                 onClick={() => handleBrandSelect(brand.id)}
//                 className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
//               >
//                 {brand.logo ? (
//                   <img
//                     src={brand.logo}
//                     alt={brand.name}
//                     className="w-16 h-16 object-contain mb-2"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2">
//                     <span className="text-xl font-bold text-gray-500">
//                       {brand.name.charAt(0)}
//                     </span>
//                   </div>
//                 )}
//                 <span className="font-medium text-gray-800">{brand.name}</span>
//               </button>
//             ))}
//           </div>

//           {filteredBrands.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-600">No car brands found matching your search.</p>
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="mt-2 text-blue-600 hover:text-blue-800"
//               >
//                 Clear search
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarBrandsPage;
