import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PrivateNavbar from '../components/navbar/PrivateNavbar'
import { getPartDetails } from '../api/carApi'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice'
import { FaHeart, FaRegHeart, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  Tooltip,
  Paper,
} from '@mui/material'

const PartDetailsPage = () => {
  const { partId } = useParams()
  const [part, setPart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites.items)

  const isFavorite = favorites.some(item => item.id === part?.id)

  useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        const data = await getPartDetails(partId)
        setPart(data)
      } catch (error) {
        toast.error('Failed to load part details')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPartDetails()
  }, [partId])

  // const handleAddToCart = () => {
  //   if (part) {
  //     dispatch(addToCart({ ...part, quantity }))
  //     toast.success(`${quantity} ${part.name} added to cart`)
  //   }
  // }
  const handleAddToCart = () => {
    if (part) {
      // dispatch(addToCart({
      //   ...part,
      //   stockQuantity: part.quantity,  // API quantity renamed
      //   quantity      // User-selected cart quantity
      // }))
      dispatch(addToCart({
        ...part,
        quantity,            // User-selected
        stockQuantity: part.quantity,  // From API
        price: Number(part.price)
      }))
      toast.success(`${quantity} ${part.name} added to cart`)
    }
  }
  

  const handleToggleFavorite = () => {
    if (part) {
      if (isFavorite) {
        dispatch(removeFromFavorites(part.id))
        toast.success(`${part.name} removed from favorites`)
      } else {
        dispatch(addToFavorites(part))
        toast.success(`${part.name} added to favorites`)
      }
    }
  }

  const handleQuantityChange = (value) => {
    const newQuantity = part.quantity + value
    if (newQuantity >= 1 && newQuantity <= (part.quantity  || 1)) {
      setQuantity(newQuantity)
    }
  }

  if (isLoading) {
    return (
      <Box minHeight="100vh" bgcolor="#f3f4f6">
        <PrivateNavbar />
        <Box px={4} py={12} textAlign="center">
          <Typography>Loading part details...</Typography>
        </Box>
      </Box>
    )
  }

  if (!part) {
    return (
      <Box minHeight="100vh" bgcolor="#f3f4f6">
        <PrivateNavbar />
        <Box px={4} py={12} textAlign="center">
          <Typography>Part not found</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box minHeight="100vh" bgcolor="#f3f4f6">
      <PrivateNavbar />
      <Box px={2} py={4} maxWidth="1200px" mx="auto">
        <Button
          startIcon={<FaArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, color: 'primary.main', textTransform: 'none' }}
        >
          Back to Parts
        </Button>

        <Paper elevation={1} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
          <Grid container spacing={4}>
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box component="img" src={part.image} alt={part.name} sx={{ width: '100%', height: 300, objectFit: 'contain', borderRadius: 2 }} />
              <Box display="flex" gap={1} mt={2} overflow="auto">
                {[1, 2, 3].map(i => (
                  <Box key={i} component="img" src={part.image} alt="thumb" sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1, border: '1px solid #ccc', cursor: 'pointer' }} />
                ))}
              </Box>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                <Typography variant="h5" fontWeight={600}>{part.name}</Typography>
                <IconButton onClick={handleToggleFavorite}>
                  {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
                </IconButton>
              </Box>

              <Typography variant="body2" color="text.secondary" mb={1}>{part.rating} Star Rating</Typography>
              <Typography variant="body2" color="text.secondary" fontStyle="italic" mb={2}>{part.description}</Typography>

              <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>SKU:</strong> {part.partNumber}</Typography>
                  <Typography variant="body2"><strong>Brand:</strong> {part.brand}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"> 
                    <strong>Availability:</strong> <span style={{ color: part.quantity > 0 ? 'green' : 'red' }}>{part.quantity > 0 ? ` ${part.quantity} In Stock` : 'Out of Stock'}</span>
                  </Typography>
                  <Typography variant="body2"><strong>Category:</strong> {part.category}</Typography>
                </Grid>
              </Grid>

              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Typography variant="h6" color="primary">₹{part.price}</Typography>
                <Box bgcolor="#fde68a" px={2} py={0.5} borderRadius={1} fontSize={14} fontWeight={500}>
                  {part.discountPercentage}% OFF
                </Box>
              </Box>

              {/* Quantity and Actions */}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <ButtonGroup size="small" variant="outlined">
                    <Button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</Button>
                    <Button disabled>{quantity}</Button>
                    <Button onClick={() => handleQuantityChange(1)} disabled={quantity >= part.quantity }>+</Button>
                  </ButtonGroup>
                </Grid>

                <Grid item xs={12} sm={5}>
                  <Button
                    onClick={handleAddToCart}
                    disabled={part.quantity  <= 0}
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: part.quantity  > 0 ? '#facc15' : '#ccc', color: part.quantity  > 0 ? 'black' : 'gray', '&:hover': { bgcolor: '#fbbf24' } }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>

              <Box mt={4} display="flex" gap={2} alignItems="center" fontSize={14} color="gray">
                Share Product:
                <Tooltip title="Facebook"><span style={{ color: '#3b5998', cursor: 'pointer' }}>Facebook</span></Tooltip>
                <Tooltip title="Twitter"><span style={{ color: '#1da1f2', cursor: 'pointer' }}>Twitter</span></Tooltip>
                <Tooltip title="Instagram"><span style={{ color: '#e1306c', cursor: 'pointer' }}>Instagram</span></Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  )
}

export default PartDetailsPage





// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import PrivateNavbar from '../components/navbar/PrivateNavbar'
// import { getPartDetails } from '../api/carApi'
// import { toast } from 'react-hot-toast'
// import { useDispatch, useSelector } from 'react-redux'
// import { addToCart } from '../features/cart/cartSlice'
// import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice'
// import { FaHeart, FaRegHeart, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'

// const PartDetailsPage = () => {
//   const { partId } = useParams()
//   const [part, setPart] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [quantity, setQuantity] = useState(1)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const favorites = useSelector(state => state.favorites.items)

//   const isFavorite = favorites.some(item => item.id === part?.id)

//   useEffect(() => {
//     const fetchPartDetails = async () => {
//       try {
//         const data = await getPartDetails(partId)
//         setPart(data)
//       } catch (error) {
//         toast.error('Failed to load part details')
//       } finally {
//         setIsLoading(false)
//       }
//     }
    
//     fetchPartDetails()
//   }, [partId])

//   const handleAddToCart = () => {
//     if (part) {
//       dispatch(addToCart({ ...part, quantity }))
//       toast.success(`${quantity} ${part.name} added to cart`)
//     }
//   }

//   const handleToggleFavorite = () => {
//     if (part) {
//       if (isFavorite) {
//         dispatch(removeFromFavorites(part.id))
//         toast.success(`${part.name} removed from favorites`)
//       } else {
//         dispatch(addToFavorites(part))
//         toast.success(`${part.name} added to favorites`)
//       }
//     }
//   }

//   const handleQuantityChange = (value) => {
//     const newQuantity = quantity + value
//     if (newQuantity >= 1 && newQuantity <= (part?.stock || 1)) {
//       setQuantity(newQuantity)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <PrivateNavbar />
//         <div className="container mx-auto px-4 py-12 text-center">
//           <p>Loading part details...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!part) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <PrivateNavbar />
//         <div className="container mx-auto px-4 py-12 text-center">
//           <p>Part not found</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PrivateNavbar />

//       <div className="container mx-auto px-4 py-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back to Parts
//         </button>

//         <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* IMAGE */}
//             <div>
//               <img 
//                 src={part.image} 
//                 alt={part.name} 
//                 className="w-full h-[200px] md:h-[300px] object-contain mb-3 rounded-md border"
//               />

//               {/* Thumbnails */}
//               <div className="flex gap-2 overflow-x-auto mt-2">
//                 {[1, 2, 3, 4].map(i => (
//                   <img 
//                     key={i} 
//                     src={part.image} 
//                     alt="Thumbnail" 
//                     className="h-20 w-20 object-cover rounded border hover:opacity-80 cursor-pointer"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div>
//               <div className="flex justify-between items-start mb-4">
//                 <h1 className="text-xl md:text-2xl font-semibold">{part.name}</h1>
//                 <button onClick={handleToggleFavorite}>
//                   {isFavorite ? (
//                     <FaHeart className="text-red-500 text-2xl" />
//                   ) : (
//                     <FaRegHeart className="text-gray-600 text-2xl" />
//                   )}
//                 </button>
//               </div>

//               <p className="text-sm mb-2">{part.rating} Star Rating</p>

//               <p className="text-sm italic text-gray-500 mb-3">{part.description}</p>

//               <div className="grid grid-cols-2 gap-4 text-sm mb-4">
//                 <div>
//                   <p><strong>SKU:</strong> {part.partNumber}</p>
//                   <p><strong>Brand:</strong> {part.brand}</p>
//                 </div>
//                 <div>
//                   <p><strong>Availability:</strong> <span className={part.stock > 0 ? "text-green-600" : "text-red-600"}>{part.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
//                   <p><strong>Category:</strong> {part.category}</p>
//                 </div>
//               </div>

//               <div className="flex items-center mb-4 gap-3">
//                 <span className="text-2xl font-bold text-blue-600">
//                   ₹{part.price}
//                 </span>
//                 <span className="bg-yellow-300 px-3 py-1 text-sm font-semibold rounded-md">
//                   {part.discountPercentage}% OFF
//                 </span>
//               </div>

//               {/* Quantity & Buttons */}
//               <div className="grid grid-cols-12 gap-3 items-center mt-6">
//                 <div className="col-span-3">
//                   <div className="flex items-center justify-between border rounded px-3 py-1">
//                     <button
//                       onClick={() => handleQuantityChange(-1)}
//                       disabled={quantity <= 1}
//                       className="text-lg font-bold"
//                     >-</button>
//                     <span>{quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(1)}
//                       disabled={quantity >= part.stock}
//                       className="text-lg font-bold"
//                     >+</button>
//                   </div>
//                 </div>

//                 <div className="col-span-5">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={part.stock <= 0}
//                     className={`w-full py-2 rounded font-medium text-sm uppercase transition ${
//                       part.stock > 0 ? 'bg-yellow-300 hover:bg-yellow-400 text-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>

//                 <div className="col-span-4 flex justify-end">
//                   <button onClick={handleToggleFavorite}>
//                     {isFavorite ? (
//                       <FaHeart className="text-red-500 text-xl" />
//                     ) : (
//                       <FaRegHeart className="text-gray-600 text-xl" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Share */}
//               <div className="mt-5 text-sm text-gray-600 flex gap-3 items-center">
//                 Share Product:
//                 <span className="text-blue-600">Facebook</span>
//                 <span className="text-blue-400">Twitter</span>
//                 <span className="text-pink-500">Instagram</span>
//               </div>
//             </div>
//           </div> 
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PartDetailsPage



// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import PrivateNavbar from '../components/navbar/PrivateNavbar'
// import { getPartDetails } from '../api/carApi'
// import { toast } from 'react-hot-toast'
// import { useDispatch, useSelector } from 'react-redux'
// import { addToCart } from '../features/cart/cartSlice'
// import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice'
// import { FaHeart, FaRegHeart, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'

// const PartDetailsPage = () => {
//   const { partId } = useParams()
//   const [part, setPart] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [quantity, setQuantity] = useState(1)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const favorites = useSelector(state => state.favorites.items)

//   const isFavorite = favorites.some(item => item.id === part?.id)

//   useEffect(() => {
//     const fetchPartDetails = async () => {
//       try {
//         const data = await getPartDetails(partId)
//         setPart(data)
//       } catch (error) {
//         toast.error('Failed to load part details')
//       } finally {
//         setIsLoading(false)
//       }
//     }
    
//     fetchPartDetails()
//   }, [partId])

//   const handleAddToCart = () => {
//     if (part) {
//       dispatch(addToCart({ ...part, quantity }))
//       toast.success(`${quantity} ${part.name} added to cart`)
//     }
//   }

//   const handleToggleFavorite = () => {
//     if (part) {
//       if (isFavorite) {
//         dispatch(removeFromFavorites(part.id))
//         toast.success(`${part.name} removed from favorites`)
//       } else {
//         dispatch(addToFavorites(part))
//         toast.success(`${part.name} added to favorites`)
//       }
//     }
//   }

//   const handleQuantityChange = (value) => {
//     const newQuantity = quantity + value
//     if (newQuantity >= 1 && newQuantity <= (part?.stock || 1)) {
//       setQuantity(newQuantity)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <PrivateNavbar />
//         <div className="container mx-auto px-4 py-12 text-center">
//           <p>Loading part details...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!part) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <PrivateNavbar />
//         <div className="container mx-auto px-4 py-12 text-center">
//           <p>Part not found</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PrivateNavbar />
      
//       <div className="container mx-auto px-4 py-12">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back to Parts
//         </button>
        
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="md:flex">
//             <div className="md:w-1/2 p-6">
//               <img 
//                 src={part.image} 
//                 alt={part.name} 
//                 className="w-full h-auto max-h-96 object-contain"
//               />
//             </div>
            
//             <div className="md:w-1/2 p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h1 className="text-2xl font-bold text-gray-800">{part.name}</h1>
//                 <button
//                   onClick={handleToggleFavorite}
//                   className="p-2 text-xl"
//                   aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//                 >
//                   {isFavorite ? (
//                     <FaHeart className="text-red-500" />
//                   ) : (
//                     <FaRegHeart className="text-gray-600" />
//                   )}
//                 </button>
//               </div>
              
//               <div className="mb-4">
//                 <span className="text-3xl font-bold text-blue-600">
//                   ${part.price.toFixed(2)}
//                 </span>
//                 <span className={`ml-4 text-sm ${part.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                   {part.stock > 0 ? `${part.stock} in stock` : 'Out of stock'}
//                 </span>
//               </div>
              
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
//                 <p className="text-gray-600">{part.description}</p>
//               </div>
              
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">Specifications</h2>
//                 <ul className="grid grid-cols-2 gap-2 text-gray-600">
//                   <li><span className="font-medium">Brand:</span> {part.brand}</li>
//                   <li><span className="font-medium">Part Number:</span> {part.partNumber}</li>
//                   <li><span className="font-medium">Compatibility:</span> {part.compatibility}</li>
//                   <li><span className="font-medium">Warranty:</span> {part.warranty}</li>
//                 </ul>
//               </div>
              
//               <div className="flex items-center mb-6">
//                 <div className="flex items-center border rounded-md mr-4">
//                   <button
//                     onClick={() => handleQuantityChange(-1)}
//                     disabled={quantity <= 1}
//                     className="px-3 py-1 text-xl disabled:opacity-50"
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-1">{quantity}</span>
//                   <button
//                     onClick={() => handleQuantityChange(1)}
//                     disabled={quantity >= part.stock}
//                     className="px-3 py-1 text-xl disabled:opacity-50"
//                   >
//                     +
//                   </button>
//                 </div>
                
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={part.stock <= 0}
//                   className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg ${part.stock > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//                 >
//                   <FaShoppingCart className="mr-2" />
//                   Add to Cart (${(part.price * quantity).toFixed(2)})
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PartDetailsPage