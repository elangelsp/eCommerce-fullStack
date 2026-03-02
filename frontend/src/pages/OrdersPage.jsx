import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { fetchOrdersByUser } from '../services/services'
import { useNavigate } from 'react-router-dom'

const OrdersPage = () => {
  const { id, isLoggedIn } = useContext(AuthContext)
  const userId = id?.id
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!isLoggedIn() || !userId) {
        setLoading(false)
        return
      }
      try {
        const data = await fetchOrdersByUser(userId)
        if (data && data.status === 'success') {
          setOrders(data.orders || [])
        } else {
          setError('No se han podido cargar los pedidos.')
        }
      } catch (e) {
        setError('Error al cargar los pedidos.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isLoggedIn, userId])

  if (!isLoggedIn()) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 max-w-md w-full text-center">
          <p className="mb-4 text-gray-700">
            Debes iniciar sesión para ver tus pedidos.
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Cargando tus pedidos...</p>
      </div>
    )
  }

  if (!orders.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-6 max-w-md w-full text-center">
          <h1 className="text-2xl font-semibold mb-4">Mis pedidos</h1>
          <p className="text-gray-700 mb-4">Todavía no has realizado ningún pedido.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Ir a la tienda
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
    })

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Mis pedidos</h1>

      {error && (
        <p className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Importe
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 text-sm text-gray-700">
                  #{order.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-blue-700">
                  {Number(order.total).toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersPage

