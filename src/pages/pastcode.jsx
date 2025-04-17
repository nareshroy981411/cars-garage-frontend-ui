
// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import PublicNavbar from '../components/navbar/PublicNavbar'
// import carVideo from '../assets/videos/landingVideo.mp4'
// import HondaCivic from "../assets/images/hondaCivic.jpg"
// import airFilter from '../assets/images/airFilter.jpg'
// import BrakePads from '../assets/images/BrakePads.jpg'
// import oilFilter from '../assets/images/oilFilter.jpg'
// import fordMustang from '../assets/images/fordMustang.jpg'
// import toyataCarmy from '../assets/images/toyataCarmy.jpg'

// const LandingPage = () => {
//   const navigate = useNavigate()

//   const featuredCars = [
//     { id: 1, name: 'Toyota Camry', image: toyataCarmy, partsCount: 120 },
//     { id: 2, name: 'Honda Civic', image: HondaCivic, partsCount: 95 },
//     { id: 3, name: 'Ford Mustang', image: fordMustang, partsCount: 150 },
//   ]

//   const featuredParts = [
//     { id: 1, name: 'Brake Pads', image: BrakePads, price: 445.99 },
//     { id: 2, name: 'Oil Filter', image: oilFilter, price: 212.99 },
//     { id: 3, name: 'Air Filter', image: airFilter, price: 318.99 },
//   ]

//   const handleCardClick = () => {
//     alert("Please register to explore more!")
//     navigate('/register')
//   }

//   return (
  
//     <div className="relative min-h-screen">
//       <PublicNavbar />
      
//       {/* Background Video */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <video 
//           autoPlay 
//           loop 
//           muted 
//           className="w-full h-full object-cover opacity-50"
//         >
//           <source src={carVideo} type="video/mp4" />
//         </video>
//       </div>

//       {/* Landing Message */}
//       <div className="relative z-10 container mx-auto px-4 py-24">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-white mb-4">Premium Car Spare Parts</h1>
//           <p className="text-xl text-gray-300">Genuine parts for your beloved vehicle</p>
//         </div>
//       </div>

//       {/* Featured Sections Below Video */}
//       <div className="relative z-10 container mx-auto px-4 pb-24">
//         {/* Featured Cars */}
//         <div className="mb-16">
//           <h2 className="text-3xl font-semibold text-white mb-8">Featured Cars</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {featuredCars.map(car => (
//               <div 
//                 key={car.id} 
//                 onClick={handleCardClick}
//                 className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition"
//               >
//                 <img 
//                   src={car.image} 
//                   alt={car.name} 
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold">{car.name}</h3>
//                   <p className="text-gray-600">{car.partsCount} parts available</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Featured Parts */}
//         <div>
//           <h2 className="text-3xl font-semibold text-white mb-8">Popular Parts</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {featuredParts.map(part => (
//               <div 
//                 key={part.id}
//                 onClick={handleCardClick}
//                 className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition"
//               >
//                 <img 
//                   src={part.image} 
//                   alt={part.name} 
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold">{part.name}</h3>
//                   <p className="text-gray-600">₹{part.price.toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LandingPage


// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import PublicNavbar from '../components/navbar/PublicNavbar'
// import carVideo from '../assets/videos/landingVideo.mp4'

// const LandingPage = () => {
//   const navigate = useNavigate()

//   const featuredCars = [
//     { id: 1, name: 'Toyota Camry', image: 'toyota-camry.jpg', partsCount: 120 },
//     { id: 2, name: 'Honda Civic', image: 'honda-civic.jpg', partsCount: 95 },
//     { id: 3, name: 'Ford Mustang', image: 'ford-mustang.jpg', partsCount: 150 },
//   ]

//   const featuredParts = [
//     { id: 1, name: 'Brake Pads', image: 'brake-pads.jpg', price: 45.99 },
//     { id: 2, name: 'Oil Filter', image: 'oil-filter.jpg', price: 12.99 },
//     { id: 3, name: 'Air Filter', image: 'air-filter.jpg', price: 18.99 },
//   ]

//   return (
//     <div className="relative min-h-screen">
//       <PublicNavbar />
      
//       {/* Background Video */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <video 
//           autoPlay 
//           loop 
//           muted 
//           className="w-full h-full object-cover opacity-50"
//         >
//           <source src={carVideo} type="video/mp4" />
//         </video>
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4 py-24">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-white mb-4">Premium Car Spare Parts</h1>
//           <p className="text-xl text-gray-300">Genuine parts for your beloved vehicle</p>
//         </div>
        
//         {/* Featured Cars */}
//         <div className="mb-16">
//           <h2 className="text-3xl font-semibold text-white mb-8">Featured Cars</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {featuredCars.map(car => (
//               <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
//                 <img 
//                   src={`/images/${car.image}`} 
//                   alt={car.name} 
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold">{car.name}</h3>
//                   <p className="text-gray-600">{car.partsCount} parts available</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Featured Parts */}
//         <div>
//           <h2 className="text-3xl font-semibold text-white mb-8">Popular Parts</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {featuredParts.map(part => (
//               <div key={part.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
//                 <img 
//                   src={`/images/${part.image}`} 
//                   alt={part.name} 
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold">{part.name}</h3>
//                   <p className="text-gray-600">₹{part.price.toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LandingPage