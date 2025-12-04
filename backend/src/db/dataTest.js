import query from './db.js';

export const insertTestData = async () => {
    try {
        
        const sql = `INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)`;
        const values = ['angel', 'cabreramartosa96@gmail.com', '123456', 'admin', new Date()];

        const result = await query(sql, values)();

        console.log("Test data insert succesfull: ", result);

    } catch (error) {
        console.log('Error inserting test data:', error);
    }
}

