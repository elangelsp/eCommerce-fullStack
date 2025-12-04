import query from '../db/db.js';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
        const values = [email, password];

        await query(sql, values)();

        res.status(200).json({ message: 'Inicio de sesion exitoso', status: 'success' });

    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesion', status: 'error' });
    }
 }

 export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const sql = `INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)`;
        const values = [name, email, password, role, new Date()];

        await query(sql, values)();

        res.status(201).json({ message: 'Usuario registrado exitosamente', status: 'success' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', status: 'error' });
    }
 }