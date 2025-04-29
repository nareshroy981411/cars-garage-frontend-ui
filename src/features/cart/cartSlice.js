import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)

      if (existingItem) {
        // If already in cart, increase quantity without exceeding stock
        const totalDesired = existingItem.quantity + newItem.quantity
        existingItem.quantity = Math.min(totalDesired, existingItem.stockQuantity)
      } else {
        // New item, ensure quantity doesn't exceed stock
        const initialQuantity = Math.min(newItem.quantity, newItem.stockQuantity)
        state.items.push({ ...newItem, quantity: initialQuantity })
      }

      state.total = calculateTotal(state.items)
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)

      if (item) {
        if (quantity < 1) {
          item.quantity = 1
        } else if (quantity > item.stockQuantity) {
          item.quantity = item.stockQuantity
        } else {
          item.quantity = quantity
        }
      }

      state.total = calculateTotal(state.items)
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = calculateTotal(state.items)
    },

    clearCart: (state) => {
      state.items = []
      state.total = 0
    }
  }
})

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer


// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   items: [],
//   total: 0
// }

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.items.find(item => item.id === action.payload.id)
      
//       if (existingItem) {
//         existingItem.quantity += 1
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 })
//       }
      
//       state.total = calculateTotal(state.items)
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload)
//       state.total = calculateTotal(state.items)
//     },
//     updateQuantity: (state, action) => {
//       const item = state.items.find(item => item.id === action.payload.id)
//       if (item) {
//         item.quantity = action.payload.quantity
//         state.total = calculateTotal(state.items)
//       }
//     },
//     clearCart: (state) => {
//       state.items = []
//       state.total = 0
//     }
//   }
// })

// const calculateTotal = (items) => {
//   return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
// }

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// export default cartSlice.reducer
