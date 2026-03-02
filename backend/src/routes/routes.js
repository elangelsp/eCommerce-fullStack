import express from 'express';
import { getUserById, loginUser, registerUser, updateUserById } from '../Controllers/usersController.js';
import { setAddress } from '../Controllers/addressController.js';
import { getAllProductsImg, getCategories, getProductImg, getProducts } from '../Controllers/productsController.js';
import { addToCart, clearCart, getCartByUser, removeItemFromCart } from '../Controllers/cartController.js';
import { createOrderFromCart, getOrdersByUser } from '../Controllers/ordersController.js';

const router = express.Router();

// Ruta de prueba
router.get('/test', (req, res) => {
    console.log("Welcome to the eCommerce API");
  res.status(200).json('Welcome to the eCommerce API');
});

//Usuarios
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/users/:userId', getUserById);
router.put('/users/:userId', updateUserById);

//Address
router.post('/:userId/address', setAddress);

//Products
router.post('/products', getProducts);
router.post('/categories', getCategories);
router.post('/products/:product_id/img', getProductImg);
router.post('/products/img', getAllProductsImg);

// Cart
router.post('/cart/add', addToCart);
router.get('/cart/:userId', getCartByUser);
router.delete('/cart/:userId/item/:productId', removeItemFromCart);
router.delete('/cart/:userId/clear', clearCart);

// Orders
router.post('/orders/from-cart', createOrderFromCart);
router.get('/orders/user/:userId', getOrdersByUser);

export default router;