import query from './db.js';

const insertUserTestData = async () => {
    try {
        const sql = `INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)`;
        const values = [
            ['Admin Angel', 'angel@example.com', '123456', 'admin', new Date()],
            ['Juan Perez', 'juan@example.com', '123456', 'user', new Date()],
            ['Maria Lopez', 'maria@example.com', '123456', 'user', new Date()],
            ['Carlos Ruiz', 'carlos@example.com', '123456', 'user', new Date()],
            ['Ana Gomez', 'ana@example.com', '123456', 'user', new Date()],
            ['Luis Torres', 'luis@example.com', '123456', 'user', new Date()],
            ['Elena Sanz', 'elena@example.com', '123456', 'user', new Date()],
            ['Pablo Marmol', 'pablo@example.com', '123456', 'user', new Date()],
            ['Sara Connor', 'sara@example.com', '123456', 'user', new Date()],
            ['Tom Baker', 'tom@example.com', '123456', 'user', new Date()]
        ];
        for (const val of values) { await query(sql, val)(); }
        console.log("Usuarios insertados correctamente");
    } catch (error) { console.log('Error en Users:', error); }
};

const insertCategoriesTestData = async () => {
    try {
        const sql = `INSERT INTO categories (name, identificador_url) VALUES (?, ?)`;
        const values = [
            ['Electrónica', 'electronica'], ['Ropa', 'ropa'], ['Hogar', 'hogar'],
            ['Deportes', 'deportes'], ['Juguetes', 'juguetes'], ['Libros', 'libros'],
            ['Belleza', 'belleza'], ['Mascotas', 'mascotas'], ['Jardín', 'jardin'], ['Videojuegos', 'videojuegos']
        ];
        for (const val of values) { await query(sql, val)(); }
        console.log("Categorías insertadas correctamente");
    } catch (error) { console.log('Error en Categories:', error); }
};

const insertProductsTestData = async () => {
    try {
        const sql = `INSERT INTO products (name, description, price, stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            ['Smartphone X', 'Gama alta, 128GB', 799.99, 50, new Date(), new Date()],
            ['Camiseta Algodón', '100% orgánica', 19.99, 100, new Date(), new Date()],
            ['Cafetera Express', 'Café profesional', 120.50, 20, new Date(), new Date()],
            ['Balón Fútbol', 'Reglamentario FIFA', 25.00, 200, new Date(), new Date()],
            ['Muñeca Articulada', 'Con accesorios', 15.00, 30, new Date(), new Date()],
            ['Novela Misterio', 'Best seller 2024', 22.90, 15, new Date(), new Date()],
            ['Set Maquillaje', 'Hipoalergénico', 45.00, 40, new Date(), new Date()],
            ['Rascador Gatos', 'Altura 1.2m', 35.00, 10, new Date(), new Date()],
            ['Cortacésped', 'Eléctrico 1500W', 210.00, 5, new Date(), new Date()],
            ['Consola Play Pro', 'Resolución 4K', 499.00, 12, new Date(), new Date()]
        ];
        for (const val of values) { await query(sql, val)(); }
        console.log("Productos insertados correctamente");
    } catch (error) { console.log('Error en Products:', error); }
};

const insertProductCategoryTestData = async () => {
    try {
        const sql = `INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`;
        // Asigna cada producto a su categoría correspondiente
        for (let i = 1; i <= 10; i++) {
            await query(sql, [i, i])();
        }
        console.log("Relaciones Producto-Categoría insertadas");
    } catch (error) { console.log('Error en Product-Category:', error); }
};

const insertProductImagesTestData = async () => {
    try {
        const sql = `INSERT INTO product_images (product_id, url, is_primary) VALUES (?, ?, ?)`;
        
        const images = [
            [1, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', true],
            [1, 'https://images.unsplash.com/photo-1556656793-062ff9878233?w=500', false],
            [1, 'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=500', false],

            [2, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500', true],
            [2, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500', false],
            [2, 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500', false],

            [3, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500', true],
            [3, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500', false],
            [3, 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?w=500', false],

            [10, 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500', true],
            [10, 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=500', false],
            [10, 'https://images.unsplash.com/photo-1507457379470-08b800609da3?w=500', false],
            
            [4, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500', true],
            [5, 'https://images.unsplash.com/photo-1558021211-6d1403321394?w=500', true],
            [6, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500', true],
            [7, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500', true],
            [8, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500', true],
            [9, 'https://images.unsplash.com/photo-1592150621344-c79214bcc484?w=500', true]
        ];

        for (const img of images) {
            await query(sql, img)();
        }
        console.log("Galería de imágenes (Principales y Secundarias) insertada.");
    } catch (error) {
        console.log('Error inserting product-images:', error);
    }
};

export const insertAllTestData = async () => {

    await insertUserTestData();
    await insertCategoriesTestData();
    await insertProductsTestData();
    await insertProductCategoryTestData();
    await insertProductImagesTestData();
};