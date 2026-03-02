import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext.jsx'
import { AuthContext } from '../context/AuthContext.jsx'

const ProductCard = ({ product, imageUrl }) => {
  const { addToCart } = useContext(CartContext)
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      navigate('/login')
      return
    }
    addToCart(
      {
        ...product,
        primaryImageUrl: imageUrl || null,
      },
      1
    )
  }

  return (
    <div className="product-card bg-white rounded-lg shadow hover:shadow-lg transition p-4 w-full">
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={imageUrl || '/placeholder.png'}
          alt={product.name}
          className="w-full h-40 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold text-lg text-gray-800">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-2">Price: ${product.price}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-colors"
      >
        Añadir al carrito
      </button>
    </div>
  )
}

export default ProductCard