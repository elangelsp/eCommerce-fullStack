import query from '../db/db.js';

export const setAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const { address, city, postalCode, country, isDefault } = req.body;

        const sqlCheck = 'SELECT * FROM addresses WHERE user_id = ? AND is_default = true';
        const dataCheck = query(sqlCheck, [userId]);
        const responseCheck = await dataCheck();

    if (isDefault === true && responseCheck.length > 0 && responseCheck[0].is_default === 1) {
        {   
            console.log("1123");
            const sqlUpdate = 'UPDATE addresses SET is_default = false WHERE id = ?';
            const valuesUpdate = [responseCheck[0].id];
            const dataUpdate = query(sqlUpdate, valuesUpdate);
            await dataUpdate();
        }
    }

        const sql = `INSERT INTO addresses (user_id, address, city, postal_code, country, is_Default) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [userId, address, city, postalCode, country, isDefault];
        const data = query(sql, values);

        await data();
        
        res.status(201).json({ message: 'Dirección agregada exitosamente', status: 'success' });
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al agregar dirección', status: 'error' });
    }
}