import query from '../db/db.js';

// Agregar categoría
export const addCategory = async (req, res) => {
    try {
        const { name, identificador_url } = req.body;

        if (!name || !identificador_url) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Nombre e identificador son requeridos' 
            });
        }

        const sql = 'INSERT INTO categories (name, identificador_url) VALUES (?, ?)';
        const data = query(sql, [name, identificador_url]);
        const result = await data();

        res.status(201).json({
            status: 'success',
            message: 'Categoría creada correctamente',
            categoryId: result.insertId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Error al crear la categoría' 
        });
    }
}

// Agregar producto
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId, imageUrl } = req.body;

        if (!name || !price) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Nombre y precio son requeridos' 
            });
        }

        // Insertar producto
        const productSql = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
        const productData = query(productSql, [name, description || '', price, stock || 0]);
        const productResult = await productData();
        const productId = productResult.insertId;

        // Insertar imagen si viene
        if (imageUrl) {
            const imageSql = 'INSERT INTO product_images (product_id, url, is_primary) VALUES (?, ?, ?)';
            const imageData = query(imageSql, [productId, imageUrl, true]);
            await imageData();
        }

        // Asociar con categoría si viene
        if (categoryId) {
            const categorySql = 'INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)';
            const categoryData = query(categorySql, [productId, categoryId]);
            await categoryData();
        }

        res.status(201).json({
            status: 'success',
            message: 'Producto creado correctamente',
            productId: productId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Error al crear el producto' 
        });
    }
}
