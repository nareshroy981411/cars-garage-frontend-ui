// // src/utils/auth.js
// import jwtDecode from 'jwt-decode';
import * as jwtDecode from 'jwt-decode';

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const expiry = decoded.exp * 1000;
    return Date.now() < expiry;
  } catch (e) {
    return false;
  }
};


// // src/utils/auth.js
// import * as jwtDecode from 'jwt-decode';

// export const isTokenValid = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     return new Date(decoded.exp * 1000) > new Date();  // Ensure token is not expired
//   } catch (e) {
//     return false;
//   }
// };