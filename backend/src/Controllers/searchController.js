import query from '../db/db.js';

export const searchProducts = async (req, res) => {
    try {
        const { type, value, sort } = req.body;

        let sql = '';

        if (type === 'name') {
            // Buscar por nombre
            sql = `
                SELECT * FROM products 
                WHERE name LIKE ? OR description LIKE ?
                ORDER BY name ASC
            `;
            const data = query(sql, [`%${value}%`, `%${value}%`]);
            const products = await data();
            return res.status(200).json(products);
        }

        if (type === 'category') {
            // Buscar por categoría
            sql = `
                SELECT DISTINCT p.* FROM products p
                INNER JOIN product_categories pc ON p.id = pc.product_id
                WHERE pc.category_id = ?
                ORDER BY p.name ASC
            `;
            const data = query(sql, [value]);
            const products = await data();
            return res.status(200).json(products);
        }

        if (type === 'price') {
            // Ordenar por precio
            const orderDirection = sort === 'asc' ? 'ASC' : 'DESC';
            sql = `SELECT * FROM products ORDER BY price ${orderDirection}`;
            const data = query(sql);
            const products = await data();
            return res.status(200).json(products);
        }

        res.status(400).json({ message: 'Tipo de búsqueda inválido' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en la búsqueda', status: 'error' });
    }
}
