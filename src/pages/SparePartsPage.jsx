import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PrivateNavbar from '../components/navbar/PrivateNavbar';
import { getSpareParts } from '../api/carApi';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from '@mui/material';

const SparePartsPage = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const modelName = location.state?.modelName;
  const brandNameFromState = location.state?.brandName || 'Unknown Brand';

  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [brandName, setBrandName] = useState(brandNameFromState);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!modelName) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    const fetchSpareParts = async () => {
      try {
        setIsLoading(true);
        const data = await getSpareParts(modelName);

        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        const formattedParts = data.map((part) => ({
          ...part,
          id: part.id || Math.random().toString(36).substr(2, 9),
          name: part.name || 'Unnamed Part',
          price: parseFloat(part.price) || 0,
          quantity: parseInt(part.quantity) || 0,
          image: part.img || 'https://via.placeholder.com/300',
          category: part.category || 'uncategorized',
          isFavorite: false,
        }));

        setParts(formattedParts);
        setHasError(false);
      } catch (error) {
        console.error('Error fetching spare parts:', error);
        toast.error('Failed to load spare parts');
        setHasError(true);
        setParts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpareParts();
  }, [modelName]);

  const handleAddToCart = (part) => {
    dispatch(
      addToCart({
        ...part,
        price: parseFloat(part.price),
        quantity: 1,
      })
    );
    toast.success(`${part.name} added to cart`);
  };

  const handleToggleFavorite = (part) => {
    if (part.isFavorite) {
      dispatch(removeFromFavorites(part.id));
      toast.success(`${part.name} removed from favorites`);
    } else {
      dispatch(addToFavorites(part));
      toast.success(`${part.name} added to favorites`);
    }

    // Update UI state for heart icon
    setParts((prevParts) =>
      prevParts.map((p) =>
        p.id === part.id ? { ...p, isFavorite: !part.isFavorite } : p
      )
    );
  };

  const handleViewDetails = (partId) => {
    navigate(`/part/${partId}`);
    
  };

  const partsByCategory = parts.reduce((acc, part) => {
    const category = part.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(part);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <PrivateNavbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (hasError) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <PrivateNavbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Typography variant="h6" color="error">
            Failed to load spare parts. Please try again later.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PrivateNavbar />

      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* Category Navigation */}
        <Grid
          container
          spacing={0.5}
          mt={2}
          textAlign="center"
          sx={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
            pb: 1,
          }}
        >
          {Object.keys(partsByCategory).map((category, index) => (
            <Grid
              key={index}
              item
              xs={4}
              sm={3}
              md={2}
              sx={{
                fontSize: { xs: '10px', sm: '13px' },
                flexShrink: 0,
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
            >
              {category.replace(/_/g, ' ')}
            </Grid>
          ))}
        </Grid>

        {/* Main Content Area */}
        <Grid container spacing={2} sx={{ pt: 3 }}>
          {/* Brands Sidebar */}
          <Grid item xs={12} sm={3} md={2}>
            <Box sx={{ p: 2, position: 'sticky', top: 20 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '14px', sm: '16px' },
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                BRANDS
              </Typography>

              <Typography variant="body1" sx={{ fontSize: '14px', textTransform: 'capitalize' }}>
                {brandName.toLowerCase()}
              </Typography>
            </Box>
          </Grid>

          {/* Products Grid */}
          <Grid item xs={12} sm={9} md={10}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 3,
                textTransform: 'capitalize',
              }}
            >
              Spare parts for {brandName.toLowerCase()}
            </Typography>

            {parts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="body1" color="text.secondary">
                  No spare parts available for this brand.
                </Typography>
              </Box>
            ) : (
              Object.entries(partsByCategory).map(([category, categoryParts]) => (
                <Box key={category} sx={{ mb: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                    }}
                  >
                    {category.replace(/_/g, ' ')}
                  </Typography>
                  <Grid container spacing={3}>
                    {categoryParts.map((part) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={part.id}>
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'box-shadow 0.3s',
                            '&:hover': {
                              boxShadow: 6,
                            },
                          }}
                        >
                          <Box sx={{ position: 'relative' }}>
                            <CardMedia
                              component="img"
                              height="200"
                              image={part.image}
                              alt={part.name}
                              onClick={() => handleViewDetails(part.id)}
                              sx={{
                                cursor: 'pointer',
                                objectFit: 'contain',
                                p: 1,
                              }}
                            />
                            <Button
                              onClick={() => handleToggleFavorite(part)}
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                minWidth: 'auto',
                                p: 1,
                                bgcolor: 'background.paper',
                                borderRadius: '50%',
                                boxShadow: 1,
                              }}
                              aria-label={part.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              {part.isFavorite ? (
                                <FaHeart style={{ color: 'red', fontSize: '1rem' }} />
                              ) : (
                                <FaRegHeart style={{ fontSize: '1rem' }} />
                              )}
                            </Button>
                          </Box>

                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h3"
                              onClick={() => handleViewDetails(part.id)}
                              sx={{
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'medium',
                                '&:hover': {
                                  color: 'primary.main',
                                },
                              }}
                            >
                              {part.name}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="h6" color="primary">
                                ₹{part.price.toFixed(2)}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: part.quantity > 0 ? 'success.main' : 'error.main',
                                  fontWeight: 'medium',
                                }}
                              >
                                {part.quantity > 0 ? `${part.quantity} in stock` : 'Out of stock'}
                              </Typography>
                            </Box>

                            <Button
                              fullWidth
                              variant="contained"
                              onClick={() => handleAddToCart(part)}
                              disabled={part.quantity <= 0}
                              startIcon={<FaShoppingCart />}
                              sx={{
                                py: 1,
                                '&.Mui-disabled': {
                                  bgcolor: 'action.disabledBackground',
                                  color: 'text.disabled',
                                },
                              }}
                            >
                              Add to Cart
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SparePartsPage;


// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import PrivateNavbar from '../components/navbar/PrivateNavbar'
// import { getSpareParts } from '../api/carApi'
// import { toast } from 'react-hot-toast'
// import { useDispatch } from 'react-redux'
// import { addToCart } from '../features/cart/cartSlice'
// import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice'
// import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
// import { useLocation } from 'react-router-dom';
 
// const SparePartsPage = () => {
//   const { brandId } = useParams()
//   const [parts, setParts] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [brandName, setBrandName] = useState('')
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const location = useLocation();
//   const modelName = location.state?.modelName; // Get modelName from state

//   useEffect(() => {
//     if (!modelName) return;
//     const fetchSpareParts = async () => {
//       try {
//         const data = await getSpareParts(modelName) 
//         setParts(data.parts)
//         setBrandName(data.brandName)
//       } catch (error) {
//         toast.error('Failed to load spare parts')
//       } finally {
//         setIsLoading(false)
//       }
//     }
    
//     fetchSpareParts()
//   }, [modelName])

//   const handleAddToCart = (part) => {
//     dispatch(addToCart(part))
//     toast.success(`${part.name} added to cart`)
//   }

//   const handleToggleFavorite = (part) => {
//     if (part.isFavorite) {
//       dispatch(removeFromFavorites(part.id))
//       toast.success(`${part.name} removed from favorites`)
//     } else {
//       dispatch(addToFavorites(part))
//       toast.success(`${part.name} added to favorites`)
//     }
//   }

//   const handleViewDetails = (partId) => {
//     navigate(`/part/${partId}`)
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <PrivateNavbar />
//         <div className="container mx-auto px-4 py-12 text-center">
//           <p>Loading spare parts...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <PrivateNavbar />
      
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           Spare Parts for {brandName}
//         </h1>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {parts.map(part => (
//             <div key={part.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//               <div className="relative">
//                 <img 
//                   src={part.image} 
//                   alt={part.name} 
//                   className="w-full h-48 object-cover cursor-pointer"
//                   onClick={() => handleViewDetails(part.id)}
//                 />
//                 <button
//                   onClick={() => handleToggleFavorite(part)}
//                   className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
//                   aria-label={part.isFavorite ? "Remove from favorites" : "Add to favorites"}
//                 >
//                   {part.isFavorite ? (
//                     <FaHeart className="text-red-500" />
//                   ) : (
//                     <FaRegHeart className="text-gray-600" />
//                   )}
//                 </button>
//               </div>
              
//               <div className="p-4">
//                 <h3 
//                   className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:text-blue-600"
//                   onClick={() => handleViewDetails(part.id)}
//                 >
//                   {part.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">{part.description}</p>
                
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-lg font-bold text-blue-600">${part.price.toFixed(2)}</span>
//                   <span className={`text-sm ${part.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                     {part.stock > 0 ? `${part.stock} in stock` : 'Out of stock'}
//                   </span>
//                 </div>
                
//                 <button
//                   onClick={() => handleAddToCart(part)}
//                   disabled={part.stock <= 0}
//                   className={`w-full flex items-center justify-center py-2 px-4 rounded-lg ${part.stock > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
//                 >
//                   <FaShoppingCart className="mr-2" />
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {parts.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No spare parts available for this brand.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default SparePartsPage
