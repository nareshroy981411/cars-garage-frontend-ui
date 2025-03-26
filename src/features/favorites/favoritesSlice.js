import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (!existingItem) {
        state.items.push(action.payload)
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearFavorites: (state) => {
      state.items = []
    }
  }
})

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer