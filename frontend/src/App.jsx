import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes/routes'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  )
}

export default App