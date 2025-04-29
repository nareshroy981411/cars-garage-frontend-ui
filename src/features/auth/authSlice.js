// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('authToken');

const initialState = {
  user: null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('authToken', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;




// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   user: null,
//   isAuthenticated: false
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.user = action.payload
//       state.isAuthenticated = true
//     },
//     logout: (state) => {
//       state.user = null
//       state.isAuthenticated = false
//     }
//   }
// })

// export const { setCredentials, logout } = authSlice.actions

// export default authSlice.reducer

// export const selectCurrentUser = (state) => state.auth.user
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated