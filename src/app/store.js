import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import profileReducer from '../features/auth/profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    profile: profileReducer,
  },
})