import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import { CartContext } from '../context/CartContext.jsx'

const Header = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="bg-gray-800 text-white w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              Dashboard
            </Link>
          )}
          {user && (
            <Link
              to="/orders"
              className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              Mis pedidos
            </Link>
          )}
          <Link
            to="/cart"
            className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            Carrito
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          {user ? (
            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header