import query from '../db/db.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];

    const data = query(sql, values);
    const response = await data();

    if (!response || response.length === 0) {
      return res
        .status(401)
        .json({ message: 'Credenciales inválidas', status: 'error' });
    }

    const user = response[0];

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      status: 'success',
      username: user.name,
      id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error al iniciar sesión', status: 'error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const role = 'user';

    const sql =
      'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, password, role, new Date()];

    const data = query(sql, values);
    const response = await data();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      status: 'success',
      username: name,
      id: response.insertId,
      email,
      role,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error al registrar usuario', status: 'error' });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const sql =
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?';
    const data = query(sql, [userId]);
    const rows = await data();

    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Usuario no encontrado' });
    }

    res.status(200).json({ status: 'success', user: rows[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 'error', message: 'Error al obtener el usuario' });
  }
};

export const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  try {
    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = ?');
      values.push(name);
    }
    if (email) {
      fields.push('email = ?');
      values.push(email);
    }
    if (password) {
      fields.push('password = ?');
      values.push(password);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No se han enviado datos para actualizar',
      });
    }

    values.push(userId);

    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    const data = query(sql, values);
    await data();

    const selectSql =
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?';
    const selectData = query(selectSql, [userId]);
    const rows = await selectData();

    res
      .status(200)
      .json({ status: 'success', message: 'Usuario actualizado', user: rows[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 'error', message: 'Error al actualizar el usuario' });
  }
};