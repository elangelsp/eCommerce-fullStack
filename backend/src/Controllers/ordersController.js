import query from '../db/db.js'

const getCartWithItems = async (userId) => {
  const selectCartSql = 'SELECT * FROM cart WHERE user_id = ?'
  const selectCartData = query(selectCartSql, [userId])
  const carts = await selectCartData()

  if (carts.length === 0) {
    return { cart: null, items: [] }
  }

  const cart = carts[0]

  const sql = `
    SELECT ci.product_id, ci.quantity, p.price
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.cart_id = ?
  `
  const data = query(sql, [cart.id])
  const items = await data()

  return { cart, items }
}

export const createOrderFromCart = async (req, res) => {
  const { userId, paymentMethod } = req.body

  if (!userId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'userId es requerido' })
  }

  try {
    const { cart, items } = await getCartWithItems(userId)

    if (!cart || items.length === 0) {
      return res
        .status(400)
        .json({ status: 'error', message: 'El carrito está vacío' })
    }

    const total = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    )

    const insertOrderSql =
      'INSERT INTO orders (user_id, total, status, payment_method) VALUES (?, ?, ?, ?)'
    const insertOrderData = query(insertOrderSql, [
      userId,
      total,
      'pending',
      paymentMethod || null,
    ])
    const orderResult = await insertOrderData()

    const orderId = orderResult.insertId

    for (const item of items) {
      const insertItemSql =
        'INSERT INTO order_items (order_id, product_id, price, quantity) VALUES (?, ?, ?, ?)'
      const insertItemData = query(insertItemSql, [
        orderId,
        item.product_id,
        item.price,
        item.quantity,
      ])
      await insertItemData()
    }

    const deleteItemsSql = 'DELETE FROM cart_items WHERE cart_id = ?'
    const deleteItemsData = query(deleteItemsSql, [cart.id])
    await deleteItemsData()

    res.status(201).json({
      status: 'success',
      orderId,
      total,
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ status: 'error', message: 'Error al crear el pedido' })
  }
}

export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'userId es requerido' })
  }

  try {
    const sql =
      'SELECT id, total, status, payment_method, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC'
    const data = query(sql, [userId])
    const orders = await data()

    res.status(200).json({ status: 'success', orders })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ status: 'error', message: 'Error al obtener los pedidos' })
  }
}

