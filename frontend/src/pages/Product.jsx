import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProducts, fetchProductImg } from '../services/services'
import { AuthContext } from '../context/AuthContext.jsx'
import { CartContext } from '../context/CartContext.jsx'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [images, setImages] = useState([])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const load = async () => {
      const allProducts = await fetchProducts()
      const found = (allProducts || []).find((p) => String(p.id) === String(id))
      setProduct(found || null)
      const imgs = await fetchProductImg(id)
      setImages(imgs || [])
    }
    load()
  }, [id])

  if (!product) return <div className="text-center mt-20">Producto no encontrado</div>

  const primary = images.find((img) => Number(img.is_primary) === 1) || images[0]

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      navigate('/login')
      return
    }
    addToCart(
      {
        ...product,
        primaryImageUrl: primary ? primary.url : null,
      },
      quantity
    )
  }

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value)
    if (Number.isNaN(value) || value <= 0) {
      setQuantity(1)
    } else {
      setQuantity(value)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={primary ? primary.url : '/placeholder.png'}
          alt={product.name}
          className="w-full rounded-lg shadow object-cover max-h-[400px]"
        />
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {images.map((img) => (
              <img
                key={img.url}
                src={img.url}
                alt={product.name}
                className="w-20 h-20 object-cover rounded border border-gray-200"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>
        {'stock' in product && (
          <p className="text-sm text-gray-500">Stock disponible: {product.stock}</p>
        )}
        <p className="text-2xl font-semibold text-blue-700">Precio: ${product.price}</p>

        <div className="mt-4 flex items-center gap-3">
          <label className="text-sm text-gray-700">Cantidad</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}

export default Product