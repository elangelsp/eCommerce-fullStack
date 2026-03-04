import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from '../services/services'

const SearchBar = () => {
  const [filterType, setFilterType] = useState('name') // name, category, price
  const [filterValue, setFilterValue] = useState('')
  const [sortOrder, setSortOrder] = useState('asc') // asc, desc (solo para precio)
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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

  // Buscar productos
  const handleSearch = async (e) => {
    e.preventDefault()

    if (!filterValue && filterType !== 'price') {
      setResults([])
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: filterType,
          value: filterValue,
          sort: sortOrder
        })
      })

      if (!response.ok) {
        console.log('Search error')
        setResults([])
        return
      }

      const data = await response.json()
      setResults(data || [])
      setShowResults(true)
    } catch (error) {
      console.log('Error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  // Navegar a producto
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
    setShowResults(false)
    setFilterValue('')
  }

  // Limpiar búsqueda
  const handleClear = () => {
    setFilterValue('')
    setShowResults(false)
    setResults([])
  }

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSearch} className="flex gap-2 items-end">
        {/* Selector de tipo de filtro */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Buscar por:</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value)
              setFilterValue('')
              setResults([])
            }}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="name">Nombre</option>
            <option value="category">Categoría</option>
            <option value="price">Precio</option>
          </select>
        </div>

        {/* Input de valor */}
        <div className="flex-1 flex flex-col gap-1">
          {filterType === 'price' ? (
            <label className="text-xs text-gray-400">Ordenar por:</label>
          ) : (
            <label className="text-xs text-gray-400">
              {filterType === 'name' ? 'Producto' : 'Seleccionar'}:
            </label>
          )}

          {filterType === 'name' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Ej: laptop, iphone..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {filterValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-2 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {filterType === 'category' && (
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}

          {filterType === 'price' && (
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="asc">💰 Menor a Mayor</option>
              <option value="desc">💸 Mayor a Menor</option>
            </select>
          )}
        </div>

        {/* Botón buscar */}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg text-white transition-colors font-semibold text-sm"
        >
          {loading ? '⏳' : '🔍'}
        </button>
      </form>

      {/* Resultados */}
      {showResults && results.length > 0 && (
        <div className="absolute top-32 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          <p className="text-gray-400 text-xs px-4 py-2 border-b border-gray-700 sticky top-0 bg-gray-800">
            {results.length} resultado(s)
          </p>
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0"
            >
              <h3 className="text-white font-semibold text-sm">{product.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-400 text-xs line-clamp-1">
                  {product.description || 'Sin descripción'}
                </p>
                <span className="text-blue-400 font-bold text-sm ml-2">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
              </div>
              {product.stock === 0 && (
                <p className="text-red-400 text-xs mt-1">⚠️ Sin stock</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {showResults && filterValue && results.length === 0 && !loading && (
        <div className="absolute top-32 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg z-50">
          <p className="text-gray-400 text-center text-sm">
            No encontramos resultados
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchBar
