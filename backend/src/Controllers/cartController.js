import query from '../db/db.js'

const getOrCreateCart = async (userId) => {
  const selectSql = 'SELECT * FROM cart WHERE user_id = ?'
  const selectData = query(selectSql, [userId])
  const carts = await selectData()

  if (carts.length > 0) {
    return carts[0]
  }

  const insertSql = 'INSERT INTO cart (user_id) VALUES (?)'
  const insertData = query(insertSql, [userId])
  const result = await insertData()

  return { id: result.insertId, user_id: userId }
}

const getCartItemsByCartId = async (cartId) => {
  const sql = `
    SELECT ci.product_id, ci.quantity, 
           p.name, p.description, p.price,
           pi.url as primaryImageUrl
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
    WHERE ci.cart_id = ?
  `
  const data = query(sql, [cartId])
  const rows = await data()
  return rows
}

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'userId y productId son requeridos' })
  }

  const qty = Math.max(1, Number(quantity) || 1)

  try {
    const cart = await getOrCreateCart(userId)

    const selectSql =
      'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?'
    const selectData = query(selectSql, [cart.id, productId])
    const items = await selectData()

    if (items.length > 0) {
      const updateSql =
        'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?'
      const updateData = query(updateSql, [qty, items[0].id])
      await updateData()
    } else {
      const insertSql =
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)'
      const insertData = query(insertSql, [cart.id, productId, qty])
      await insertData()
    }

    const rows = await getCartItemsByCartId(cart.id)
    res.status(200).json({ status: 'success', items: rows })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ status: 'error', message: 'Error al añadir al carrito' })
  }
}

export const getCartByUser = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'userId es requerido' })
  }

  try {
    const selectCartSql = 'SELECT * FROM cart WHERE user_id = ?'
    const selectCartData = query(selectCartSql, [userId])
    const carts = await selectCartData()

    if (carts.length === 0) {
      return res.status(200).json({ status: 'success', items: [] })
    }

    const cart = carts[0]
    const rows = await getCartItemsByCartId(cart.id)
    res.status(200).json({ status: 'success', items: rows })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ status: 'error', message: 'Error al obtener el carrito' })
  }
}

export const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params

  if (!userId || !productId) {
    return res.status(400).json({
      status: 'error',
      message: 'userId y productId son requeridos',
    })
  }

  try {
    const selectCartSql = 'SELECT * FROM cart WHERE user_id = ?'
    const selectCartData = query(selectCartSql, [userId])
    const carts = await selectCartData()

    if (carts.length === 0) {
      return res.status(200).json({ status: 'success', items: [] })
    }

    const cart = carts[0]

    const deleteSql =
      'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?'
    const deleteData = query(deleteSql, [cart.id, productId])
    await deleteData()

    const rows = await getCartItemsByCartId(cart.id)
    res.status(200).json({ status: 'success', items: rows })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ status: 'error', message: 'Error al eliminar del carrito' })
  }
}

export const clearCart = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'userId es requerido' })
  }

  try {
    const selectCartSql = 'SELECT * FROM cart WHERE user_id = ?'
    const selectCartData = query(selectCartSql, [userId])
    const carts = await selectCartData()

    if (carts.length === 0) {
      return res.status(200).json({ status: 'success', items: [] })
    }

    const cart = carts[0]

    const deleteItemsSql = 'DELETE FROM cart_items WHERE cart_id = ?'
    const deleteItemsData = query(deleteItemsSql, [cart.id])
    await deleteItemsData()

    res.status(200).json({ status: 'success', items: [] })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ status: 'error', message: 'Error al vaciar el carrito' })
  }
}

