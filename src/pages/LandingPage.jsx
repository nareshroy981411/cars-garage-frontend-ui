import React from 'react'
import { useNavigate } from 'react-router-dom'
import PublicNavbar from '../components/navbar/PublicNavbar'
import carVideo from '../assets/videos/landingVideo.mp4'
// import HondaCivic from "../assets/images/hondaCivic.jpg"
// import airFilter from '../assets/images/airFilter.jpg'
// import BrakePads from '../assets/images/BrakePads.jpg'
// import oilFilter from '../assets/images/oilFilter.jpg'
// import fordMustang from '../assets/images/fordMustang.jpg'
// import toyataCarmy from '../assets/images/toyataCarmy.jpg'
// import engine from '../assets/images/engine.jpg'
// import oil from '../assets/images/oil.jpg'
// import tires from '../assets/images/tires.jpg'
// import brakeroters from '../assets/images/brakeroters.jpg'
// import b3 from '../assets/images/b3.png'
// import audi from '../assets/images/audi.jpg'
// import b4 from '../assets/images/b4.png'
// import b5 from '../assets/images/b5.png'
// import b6 from '../assets/images/b6.png'
// import bmw from '../assets/images/bmw.jpg'
// import mech from '../assets/images/mech.png'

// Load all images from the folder
const imageModules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,gif}', { eager: true });

// Process images into a usable object
const imageFiles = {};

for (const path in imageModules) {
  const fileName = path.split('/').pop().split('.').slice(0, -1).join('.');
  imageFiles[fileName] = imageModules[path].default;
}

const LandingPage = () => {
  const navigate = useNavigate()

  const featuredCars = [
    { id: 1, name: 'Toyota Camry', image: imageFiles['toyataCarmy'], partsCount: 120 },
    { id: 2, name: 'Honda Civic', image: imageFiles['hondaCivic'], partsCount: 95 },
    { id: 3, name: 'Ford Mustang', image: imageFiles['fordMustang'], partsCount: 150 },
  ]
  const featuredCars2 = [
    { id: 1, name: 'Benz', image: imageFiles['benz'], partsCount: 80 },
    { id: 2, name: 'Swagen', image: imageFiles['swagen'], partsCount: 85 },
    { id: 3, name: 'Peugeot', image: imageFiles['peugeot'], partsCount: 110 },
  ]

  const featuredParts = [
    { id: 1, name: 'Brake Pads', image: imageFiles['BrakePads'], price: 445.99 },
    { id: 2, name: 'Oil Filter', image: imageFiles['oilFilter'], price: 212.99 },
    { id: 3, name: 'Air Filter', image: imageFiles['airFilter'], price: 318.99 },
  ]
const brands = [
  { title: "Audi", img: imageFiles['audi'] },
  { title: "BMW", img: imageFiles['bmw'] },
  { title:  "Ford", img: imageFiles['b3'] },
  { title:  "Benz", img: imageFiles['b4'] },
  { title:   "Peugeot",  img: imageFiles['b5'] },
  { title:  "swagen", img: imageFiles['b6'] },
]

const servises = [
  { title: 'Engine Repair & Maintenance', img: imageFiles['engine'] },
  { title: 'Oil & Filter', img: imageFiles['oil'] },
  { title: 'Brake Pads & Rotors', img: imageFiles['brakeroters'] },
  { title: 'Tires & Wheels', img: imageFiles['tires'] },
]
  const handleCardClick = () => {
    // alert("Please register to explore more!")
    navigate('/register')
  }

  return (
    <div className="relative min-h-screen bg-[#9d9fa1] font-barlow ">
      <PublicNavbar />
      
      {/* Background Video */}
      <div className="absolute w-full h-[500px] overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover opacity-50"
        >
          <source src={carVideo} type="video/mp4" />
        </video>
      </div>
      {/* Landing Message */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Premium Car Spare Parts</h1>
          <p className="text-xl text-gray-300">Genuine parts for your beloved vehicle</p>
        </div>
      </div>

      {/* Featured Sections Below Video */}
      <div className="relative z-10 container mx-auto px-4 pb-24">
        {/* Featured Cars */}
        <div className="mb-16">
          {/* <h2 className="text-3xl font-semibold text-black mb-8">Featured Cars</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map(car => (
              <div 
                key={car.id} 
                onClick={handleCardClick}
                className="bg-[#9d9fa1] text-white text-center rounded-lg oveshadow-lg cursor-pointer hover:shadow-xl transitionrflow-hidden "
              >
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <p className="text-gray-300">{car.partsCount} parts available</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          {/* <h2 className="text-3xl font-semibold text-black mb-8">Featured Cars</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars2.map(car => (
              <div 
                key={car.id} 
                onClick={handleCardClick}
                className="bg-[#9d9fa1] text-white text-center rounded-lg oveshadow-lg cursor-pointer hover:shadow-xl transitionrflow-hidden "
              >
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{car.name}</h3>
                  <p className="text-gray-300">{car.partsCount} parts available</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Featured Parts */}
        {/* <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredParts.map(part => (
              <div 
                key={part.id}
                onClick={handleCardClick}
                className="bg-[#9d9fa1] text-white text-center rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition"
              >
                <img 
                  src={part.image} 
                  alt={part.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{part.name}</h3>
                  <p className="text-gray-300">₹{part.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

 {/* Our Services Section */}
        <div className="relative z-10 container mx-auto px-4 py-16">
         <h2 className="text-4xl font-bold mb-6">Our Services</h2>
         <p className="text-gray-700 text-lg mb-12 max-w-2xl">
           "From high-performance engine components to durable brake pads and premium tires, we provide all the spare parts you need to keep your vehicle running smoothly."
         </p>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {servises.map(service => (
            <div key={service.id} 
            onClick={handleCardClick}
            className="bg-[#9d9fa1] shadow-lg rounded-lg text-center overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition">
              <img src={service.img} alt={service.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Our Premium Brands */}
      <div className=" bg-[#9d9fa1] container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Explore Our Premium Brands</h2>
        <div className=" bg-[#9d9fa1] flex flex-wrap justify-center space-x-6 overflow-x-auto p-4 bg-gray-100 rounded-lg">
          {brands.map(brand=> (
              <div 
                key={brand.id} 
                onClick={handleCardClick}
                className="p-4 bg-white shadow rounded-lg w-[100px] h-[120px] text-center shadow-lg cursor-pointer hover:shadow-xl transition"
              >
                <img 
                  src={brand.img} 
                  alt={brand.title} 
                  className="h-16 w-auto mx-auto object-contain"
                />
                {/* <div className="p-4"> */}
                  <p className="">{brand.title}</p>
                {/* </div> */}
              </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 py-16 flex flex-wrap items-center">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-700 text-lg mb-6">Discover why Vehicle Ride is the trusted choice for hundreds of car owners.</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Certified and experienced technicians.</li>
            <li>Transparent pricing with no hidden charges.</li>
            <li>Advanced tools and diagnostic equipment.</li>
            <li>Fast, reliable service you can trust.</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 flex justify-center relative" >
          <span className="absolute top-0 left-0 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">+15 Years of Experience</span>
          <img src={imageFiles['mech']} onClick={handleCardClick} alt="Mechanics working" className="w-3/4 rounded-lg shadow-lg shadow-lg cursor-pointer hover:shadow-xl transition" />
        </div>
      </div>

    </div>
  )
}

export default LandingPage



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import PublicNavbar from '../components/navbar/PublicNavbar';
// import carVideo from '../assets/videos/landingVideo.mp4';
// import HondaCivic from '../assets/images/hondaCivic.jpg';
// import airFilter from '../assets/images/airFilter.jpg';
// import BrakePads from '../assets/images/BrakePads.jpg';
// import oilFilter from '../assets/images/oilFilter.jpg';
// import fordMustang from '../assets/images/fordMustang.jpg';
// import toyataCamry from '../assets/images/toyataCarmy.jpg';

// const LandingPage = () => {
//   const navigate = useNavigate();

//     const featuredCars = [
//     { id: 1, name: 'Toyota Camry', image: toyataCamry, partsCount: 120 },
//     { id: 2, name: 'Honda Civic', image: HondaCivic, partsCount: 95 },
//     { id: 3, name: 'Ford Mustang', image: fordMustang, partsCount: 150 },
//   ]

//   const featuredParts = [
//     { id: 1, name: 'Brake Pads', image: BrakePads, price: 445.99 },
//     { id: 2, name: 'Oil Filter', image: oilFilter, price: 212.99 },
//     { id: 3, name: 'Air Filter', image: airFilter, price: 318.99 },
//   ]


//   const handleCardClick = () => {
//     // alert('Please register to explore more!');
//     navigate('/register');
//   };

//   return (
//     <div className="relative min-h-screen">
//       <PublicNavbar />
      
//       {/* Background Video */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <video autoPlay loop muted className="w-full h-full object-cover opacity-50">
//           <source src={carVideo} type="video/mp4" />
//         </video>
//       </div>

//       <div className="relative z-10 container mx-auto px-4 pb-24">
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

//       {/* Our Services Section */}
//       <div className="relative z-10 container mx-auto px-4 py-16">
//         <h2 className="text-4xl font-bold mb-6">Our Services</h2>
//         <p className="text-gray-700 text-lg mb-12 max-w-2xl">
//           "From high-performance engine components to durable brake pads and premium tires, we provide all the spare parts you need to keep your vehicle running smoothly."
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {[
//             { title: 'Engine Repair & Maintenance', img: airFilter },
//             { title: 'Oil & Filter', img: oilFilter },
//             { title: 'Brake Pads & Rotors', img: BrakePads },
//             { title: 'Tires & Wheels', img: toyataCamry },
//           ].map((service, index) => (
//             <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <img src={service.img} alt={service.title} className="w-full h-40 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-lg font-bold">{service.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Explore Our Premium Brands */}
//       <div className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-semibold mb-6">Explore Our Premium Brands</h2>
//         <div className="flex space-x-6 overflow-x-auto p-4 bg-gray-100 rounded-lg">
//           {["Audi", "BMW", "Ford", "Mercedes-Benz", "Peugeot", "Volkswagen"].map((brand, index) => (
//             <div key={index} className="p-4 bg-white shadow rounded-lg min-w-[100px] text-center">
//               {brand}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Why Choose Us */}
//       <div className="container mx-auto px-4 py-16 flex flex-wrap items-center">
//         <div className="w-full md:w-1/2 mb-6 md:mb-0">
//           <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
//           <p className="text-gray-700 text-lg mb-6">Discover why Vehicle Ride is the trusted choice for hundreds of car owners.</p>
//           <ul className="list-disc list-inside text-gray-600 space-y-2">
//             <li>Certified and experienced technicians.</li>
//             <li>Transparent pricing with no hidden charges.</li>
//             <li>Advanced tools and diagnostic equipment.</li>
//             <li>Fast, reliable service you can trust.</li>
//           </ul>
//         </div>
//         <div className="w-full md:w-1/2 flex justify-center relative">
//           <span className="absolute top-0 left-0 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">+15 Years of Experience</span>
//           <img src={HondaCivic} alt="Mechanics working" className="w-3/4 rounded-lg shadow-lg" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;