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
        console.log(data)
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
        setFilteredResults([modelMatch]); // Exact model match
      } else {
        const brandFiltered = brands.filter(car =>
          car.company_brand.toLowerCase().includes(lowerSearch)
        );
        setFilteredResults(brandFiltered);
      }
    }
  }, [searchTerm, brands]);

  const getInitialDisplay = () => {
    const uniqueBrands = [];
    const uniqueModels = [];
    const brandSet = new Set();
    const modelSet = new Set();

    for (const car of brands) {
      if (brandSet.size < 10 && !brandSet.has(car.company_brand)) {
        brandSet.add(car.company_brand);
        uniqueBrands.push(car);
      }

      if (modelSet.size < 10 && !modelSet.has(car.model_name)) {
        modelSet.add(car.model_name);
        uniqueModels.push(car);
      }

      if (brandSet.size === 10 && modelSet.size === 10) break;
    }

    return [...uniqueBrands, ...uniqueModels];
  };

  const displayResults = searchTerm.trim() === "" ? getInitialDisplay() : filteredResults;

  const handleSelect = (car) => {
    navigate(`/brand/${car.company_brand}/parts`, {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-4"></h1>

        <input
          type="text"
          placeholder="Search brand or exact model name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayResults.map(car => (
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

        {displayResults.length === 0 && (
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
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();


  
//   useEffect(() => {
//     const fetchCarBrands = async () => {
//       try {
//         const data = await getCarBrands();
//         console.log("Car data fetched:", data);

//         // ✅ Store full data (brands + models)
//         setBrands(data);
//         setFilteredResults(data);
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
//       setFilteredResults(brands);
//     } else {
//       const lowerSearch = searchTerm.toLowerCase();
//       const modelMatch = brands.find(car => car.model_name.toLowerCase() === lowerSearch);

//       if (modelMatch) {
//         setFilteredResults([modelMatch]); // ✅ Show only the exact model
//       } else {
//         const brandFiltered = brands.filter(car =>
//           car.company_brand.toLowerCase().includes(lowerSearch)
//         );
//         setFilteredResults(brandFiltered);
//       }
//     }
//   }, [searchTerm, brands]);

//   const handleSelect = (car) => {
//     navigate(`/brand/${car.company_brand}/parts`, {
//       state: { brandName: car.company_brand, modelName: car.model_name },
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-100 text-center">
//         <PrivateNavbar />
//         <div className="container mx-auto px-4 py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4">Loading car data...</p>
//         </div>
//       </div>
//     );
//   }
//   const getInitialDisplay = () => {
//     const uniqueBrands = [];
//     const uniqueModels = [];
//     const brandSet = new Set();
//     const modelSet = new Set();
  
//     for (const car of brands) {
//       if (brandSet.size < 10 && !brandSet.has(car.company_brand)) {
//         brandSet.add(car.company_brand);
//         uniqueBrands.push(car);
//       }
  
//       if (modelSet.size < 10 && !modelSet.has(car.model_name)) {
//         modelSet.add(car.model_name);
//         uniqueModels.push(car);
//       }
  
//       if (brandSet.size === 10 && modelSet.size === 10) break;
//     }
  
//     return [...uniqueBrands, ...uniqueModels];
//   };
  
//   const displayResults = searchTerm.trim() === "" ? getInitialDisplay() : filteredResults;
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PrivateNavbar />
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Car Brand / Model</h1>

//         <input
//           type="text"
//           placeholder="Search brand or exact model name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
//         />

//         {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {filteredResults.map(car => (
//             <button
//               key={car.id}
//               onClick={() => handleSelect(car)}
//               className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
//             >
//               {car.brand_image_url ? ( 
//                 <img
//                   src={car.brand_image_url}
//                   alt={car.company_brand}
//                   className="w-16 h-16 object-contain mb-2"
//                 />
//               ) : (
//                 <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2">
//                   <span className="text-xl font-bold text-gray-500">
//                     {car.company_brand.charAt(0)}
//                   </span>
//                 </div>
//               )}
//               <span className="font-medium text-gray-800">{car.company_brand} - {car.model_name}</span>
//             </button>
//           ))}
//         </div> */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//   {(searchTerm.trim() === "" ? filteredResults.slice(0, 10) : filteredResults).map(car => (
//     <button
//       key={car.id}
//       onClick={() => handleSelect(car)}
//       className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
//     >
//       {car.brand_image_url ? ( 
//         <img
//           src={car.brand_image_url}
//           alt={car.company_brand}
//           className="w-16 h-16 object-contain mb-2"
//         />
//       ) : (
//         <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2">
//           <span className="text-xl font-bold text-gray-500">
//             {car.company_brand.charAt(0)}
//           </span>
//         </div>
//       )}
//       <span className="font-medium text-gray-800">
//         {car.company_brand} - {car.model_name}
//       </span>
//     </button>
//   ))}
// </div>


//         {filteredResults.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-gray-600">No matching brand or model found.</p>
//             <button
//               onClick={() => setSearchTerm("")}
//               className="mt-2 text-blue-600 hover:text-blue-800"
//             >
//               Clear search
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CarBrandsPage;



