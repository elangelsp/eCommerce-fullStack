import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import { CartContext } from '../context/CartContext.jsx'
import SearchBar from './SearchBar'

const Header = () => {
  const { user, logout, isAdmin } = useContext(AuthContext)

  return (
    <header className="bg-gray-800 text-white w-full shadow-md">
      <div className="container mx-auto px-4 py-4">
        {/* Primera fila: Logo y Buscador */}
        <div className="flex justify-between items-center gap-4 mb-4">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            🛍️ eCommerce
          </Link>
          <SearchBar />
        </div>

        {/* Segunda fila: Navegación */}
        <nav className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="px-3 py-1 rounded hover:bg-gray-700 transition-colors text-sm"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="px-3 py-1 rounded hover:bg-gray-700 transition-colors text-sm"
              >
                Dashboard
              </Link>
            )}
            {user && isAdmin() && (
              <Link
                to="/admin"
                className="px-3 py-1 rounded hover:bg-gray-700 transition-colors text-sm bg-purple-600 hover:bg-purple-700"
              >
                ⚙️ Admin
              </Link>
            )}
            {user && (
              <Link
                to="/orders"
                className="px-3 py-1 rounded hover:bg-gray-700 transition-colors text-sm"
              >
                Mis pedidos
              </Link>
            )}
            <Link
              to="/cart"
              className="px-3 py-1 rounded hover:bg-gray-700 transition-colors text-sm"
            >
              🛒 Carrito
            </Link>
          </div>

          {/* Acciones de usuario */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-xs text-gray-400">
                  {user.name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition-colors text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header