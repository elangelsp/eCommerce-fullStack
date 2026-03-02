import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const { items, removeFromCart, clearCart, totalItems, totalPrice } =
    useContext(CartContext)
  const { isLoggedIn, id } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!isLoggedIn()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
          <p className="mb-4 text-gray-700">
            Debes iniciar sesión para ver tu carrito.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Ir a login
          </button>
        </div>
      </div>
    )
  }

  const handlePurchase = () => {
    const doPurchase = async () => {
      try {
        const res = await fetch('/api/orders/from-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: id.id, paymentMethod: 'card' }),
        })
        const data = await res.json()
        if (data.status === 'success') {
          await clearCart()
          alert('Compra realizada correctamente.')
        } else {
          alert('No se ha podido completar la compra.')
        }
      } catch (e) {
        alert('Error al procesar la compra.')
      }
    }
    doPurchase()
  }

  if (!items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-semibold mb-4">Tu carrito</h1>
          <p className="text-gray-700 mb-4">Tu carrito está vacío.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>

      <div className="grid grid-cols-1 gap-4">
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg shadow p-4"
          >
            <div className="w-full sm:w-32 h-32 flex-shrink-0">
              <img
                src={product.primaryImageUrl || '/placeholder.png'}
                alt={product.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-sm text-gray-500">
                Precio unitario: ${product.price}
              </p>
              <p className="text-sm text-gray-700">Cantidad: {quantity}</p>
              <p className="font-semibold text-blue-700">
                Subtotal: ${Number(product.price || 0) * quantity}
              </p>
            </div>
            <div className="flex sm:flex-col gap-2 sm:items-end">
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-gray-700">
            Artículos totales: <span className="font-semibold">{totalItems}</span>
          </p>
          <p className="text-xl font-semibold text-blue-700">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
          >
            Vaciar carrito
          </button>
          <button
            onClick={handlePurchase}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage

