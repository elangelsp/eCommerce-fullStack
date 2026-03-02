import query from './db.js';

const insertUserTestData = async () => {
    try {
        
        const sql = `INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)`;
        const values = ['angel', 'cabreramartosa96@gmail.com', '123456', 'admin', new Date()];

        await query(sql, values)();

        console.log("Test data insert succesfull: ", result);

    } catch (error) {
        console.log('Error inserting test data:', error);
    }
}

const insertProductsTestData = async () => {
    try {
        const sql = `INSERT INTO products (name, description, price, stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            ['Product 1', 'Description for product 1', 10.99, 100, new Date(), new Date()],
            ['Product 2', 'Description for product 2', 19.99, 50, new Date(), new Date()],
            ['Product 3', 'Description for product 3', 5.49, 200, new Date(), new Date()],
        ];
        for (const value of values) {
            await query(sql, value)();
        }

        console.log("Products test data insert succesfull: ", result);
    } catch (error) {
        console.log('Error inserting products test data:', error);
    }
}

const insertCategoriesTestData = async () => {
    try {
        const sql = `INSERT INTO categories (name, identificador_url) VALUES (?, ?)`;
        const values = [
            ['Electronics', 'electronics'],
            ['Books', 'books'],
            ['Clothing', 'clothing'],
        ];
        for (const value of values) {
            await query(sql, value)();
        }
        console.log("Categories test data insert succesfull: ", result);
    } catch (error) {
        console.log('Error inserting categories test data:', error);
    }
}

const insertProductCategoryTestData = async () => {
    try {
        const sql = `INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)`;
        const values = [
            [1, 1],
            [2, 2],
            [3, 3],
        ];
        for (const value of values) {
            await query(sql, value)();
        }

        console.log("Product-Categories test data insert succesfull: ", result);
    } catch (error) {
        console.log('Error inserting product-categories test data:', error);
    }
}

const insertProductImagesTestData = async () => {
    try {
        const sql = `INSERT INTO product_images (product_id, url, is_primary) VALUES (?, ?, ?)`;
        // Usar enlaces directos a las imágenes para que <img src=...> funcione correctamente
        const values1 = [
            [1, 'https://images.pexels.com/photos/6213649/pexels-photo-6213649.jpeg?auto=compress&cs=tinysrgb&w=800', true],
            [2, 'https://images.pexels.com/photos/3765116/pexels-photo-3765116.jpeg?auto=compress&cs=tinysrgb&w=800', true],
            [3, 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800', true],
        ];
        const values2 = [
            [1, 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800', false],
            [2, 'https://images.pexels.com/photos/267678/pexels-photo-267678.jpeg?auto=compress&cs=tinysrgb&w=800', false],
            [3, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', false],
        ];
        /*
        for (const value of values1) {
            await query(sql, value)();
        }
        */
        for (const i = 0; i < values1.length; i++) {
            await query(sql, values1[i])();
        }
        for (const i = 0; i < values2.length; i++) {
            await query(sql, values2[i])();
        }
        /*
        for (const value of values2) {
            await query(sql, value)();
        }
            */

        console.log("Product-Images test data insert succesfull: ", result);
    } catch (error) {
        console.log('Error inserting product-images test data:', error);
    }
}

export const insertAllTestData = async () => {
    await insertUserTestData();
    await insertProductsTestData();
    await insertCategoriesTestData();
    await insertProductCategoryTestData();
    await insertProductImagesTestData();
}

