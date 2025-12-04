import express from 'express';
import { loginUser, registerUser } from '../Controllers/usersController.js';

const router = express.Router();

// Ruta de prueba
router.get('/test', (req, res) => {
    console.log("Welcome to the eCommerce API");
  res.status(200).json('Welcome to the eCommerce API');
});

//Usuarios
router.post('/users/login', loginUser);
router.post('/users/register', registerUser);

export default router;