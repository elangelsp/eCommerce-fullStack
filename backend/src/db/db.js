import mysql from 'mysql2/promise';

// Configuracion del pool de conexiones
export const pool = mysql.createPool({
  host: 'database',  
  user: 'angel',
  password: '123456',
  database: 'eCommerce',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Funcion para verificar la conexion
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado exitosamente a MySQL (eCommerce)');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error.message);
    return false;
  }
}

// Funcion para utilizar querys
const query = (sql, params) => async () => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Error en query:', error);
    throw error;
  }
}
export default query;