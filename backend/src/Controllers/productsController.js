import query from '../db/db.js';

export const getProducts = async (req, res) => {
    try {
        const sql = 'SELECT * FROM products';
        const data = query(sql);
        const products = await data();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los productos', status: 'error' });
    }
}

export const getAllProductsImg = async (req, res) => {
    try {
        const sql = 'SELECT * FROM product_images';
        const data = query(sql);
        const images = await data();
        res.status(200).json(images);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las imágenes de los productos', status: 'error' });
    }
}

export const getProductImg = async (req, res) => {
    const { product_id } = req.params;
    try {
        const sql = 'SELECT url FROM product_images WHERE product_id = ?';
        const data = query(sql, [product_id]);
        const images = await data();
        res.status(200).json(images);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las imágenes del producto', status: 'error' });
    }
}


export const getCategories = async (req, res) => {
    try {
        const sqlCategories = 'SELECT * FROM categories';
        const dataCategories = query(sqlCategories);
        const categories = await dataCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las categorías', status: 'error' });
    }
}