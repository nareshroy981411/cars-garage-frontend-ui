// import './App.css'

// function App() {

//   return (
//     <>
      
//     </>
//   )
// }

// export default App

import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  )
}

export default App
