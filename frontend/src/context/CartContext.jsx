import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

export const CartContext = createContext()

const mapBackendItemsToState = (rows) =>
  (rows || []).map((row) => ({
    product: {
      id: row.product_id,
      name: row.name,
      description: row.description,
      price: row.price,
      primaryImageUrl: row.primaryImageUrl,
    },
    quantity: row.quantity,
  }))

export const CartProvider = ({ children }) => {
  const { id } = useContext(AuthContext)
  const userId = id?.id
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        setItems([])
        return
      }
      try {
        const res = await fetch(`/api/cart/${userId}`)
        const data = await res.json()
        if (data.status === 'success') {
          setItems(mapBackendItemsToState(data.items))
        } else {
          setItems([])
        }
      } catch {
        setItems([])
      }
    }
    loadCart()
  }, [userId])

  const addToCart = async (product, quantity = 1) => {
    if (!product || !product.id || !userId) return
    const qty = Math.max(1, Number(quantity) || 1)
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId: product.id, quantity: qty }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setItems(mapBackendItemsToState(data.items))
      }
    } catch {
      // podrías mostrar un error al usuario
    }
  }

  const removeFromCart = async (productId) => {
    if (!userId) return
    try {
      const res = await fetch(`/api/cart/${userId}/item/${productId}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.status === 'success') {
        setItems(mapBackendItemsToState(data.items))
      }
    } catch {
      // manejar error si quieres
    }
  }

  const clearCart = async () => {
    if (!userId) {
      setItems([])
      return
    }
    try {
      const res = await fetch(`/api/cart/${userId}/clear`, { method: 'DELETE' })
      const data = await res.json()
      if (data.status === 'success') {
        setItems([])
      }
    } catch {
      setItems([])
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.product.price || 0) * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

