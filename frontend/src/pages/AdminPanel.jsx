import React, { useState, useEffect } from 'react'
import { addCategoryService, addProductService, fetchCategories } from '../services/services'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('categories') // categories o products
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // success o error

  // Form states - Categories
  const [categoryName, setCategoryName] = useState('')
  const [categoryUrl, setCategoryUrl] = useState('')

  // Form states - Products
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productImageUrl, setProductImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // Cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories()
      if (data && !data.message) {
        setCategories(data)
      }
    }
    loadCategories()
  }, [])

  // Helper para mostrar mensajes
  const showMessage = (text, type) => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  // Agregar categoría
  const handleAddCategory = async (e) => {
    e.preventDefault()
    
    if (!categoryName || !categoryUrl) {
      showMessage('Por favor completa todos los campos', 'error')
      return
    }

    setLoading(true)
    const data = await addCategoryService(categoryName, categoryUrl)
    
    if (data && data.status === 'success') {
      showMessage('Categoría agregada correctamente', 'success')
      setCategoryName('')
      setCategoryUrl('')
      // Recargar categorías
      const updatedCategories = await fetchCategories()
      if (updatedCategories) setCategories(updatedCategories)
    } else {
      showMessage('Error al agregar la categoría', 'error')
    }
    setLoading(false)
  }

  // Agregar producto
  const handleAddProduct = async (e) => {
    e.preventDefault()
    
    if (!productName || !productPrice) {
      showMessage('Nombre y precio son requeridos', 'error')
      return
    }

    setLoading(true)
    const data = await addProductService(
      productName,
      productDescription,
      parseFloat(productPrice),
      parseInt(productStock) || 0,
      productCategory || null,
      productImageUrl
    )

    if (data && data.status === 'success') {
      showMessage('Producto agregado correctamente', 'success')
      setProductName('')
      setProductDescription('')
      setProductPrice('')
      setProductStock('')
      setProductCategory('')
      setProductImageUrl('')
    } else {
      showMessage('Error al agregar el producto', 'error')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Administrador</h1>

        {/* Mensaje de feedback */}
        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              messageType === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📁 Categorías
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📦 Productos
          </button>
        </div>

        {/* TAB: CATEGORÍAS */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Agregar Nueva Categoría
            </h2>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la categoría
                </label>
                <input
                  type="text"
                  placeholder="Ej: Electrónica, Ropa, etc."
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL identificador (sin espacios)
                </label>
                <input
                  type="text"
                  placeholder="Ej: electronica, ropa, etc."
                  value={categoryUrl}
                  onChange={(e) => setCategoryUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Agregando...' : '➕ Agregar Categoría'}
              </button>
            </form>

            {/* Mostrar categorías existentes */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Categorías existentes ({categories.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                  >
                    <p className="font-semibold text-gray-800">{cat.name}</p>
                    <p className="text-xs text-gray-600">
                      ID: {cat.identificador_url}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: PRODUCTOS */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Agregar Nuevo Producto
            </h2>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del producto *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Laptop HP ProBook"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  placeholder="Descripción del producto"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio ($) *
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sin categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de la imagen
                </label>
                <input
                  type="url"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={productImageUrl}
                  onChange={(e) => setProductImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {productImageUrl && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 mb-2">Vista previa:</p>
                    <img
                      src={productImageUrl}
                      alt="Preview"
                      className="max-h-40 rounded-lg border border-gray-300"
                      onError={(e) => {
                        e.target.src = '/placeholder.png'
                      }}
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Agregando...' : '➕ Agregar Producto'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
