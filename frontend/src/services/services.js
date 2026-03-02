// Login de usuario
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`/api/login`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            console.log("Login failed");
        }

    return response.json();

    } catch (error) {
        console.log(error);
    }
    
}

// Registro de usuario

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`/api/register`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password})
        });

        if (!response.ok) {
            console.log("Register failed");
        }

        return response.json();
    }catch (error) {
        console.log(error);
    }
}

// User profile

export const fetchUserById = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export const updateUserProfile = async (userId, { name, email, password }) => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

// Address

export const addAddress = async (userId, address) => {
    try {
        const response = await fetch(`/api/${userId}/address`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address })
        });
        if (!response.ok) {
            console.log("Add address failed");
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

// Products and Categories
export const fetchProducts = async () => {
    try {
        const response = await fetch(`/api/products`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log("Fetch products failed");
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export const fetchProductImg = async (product_id) => {
    try {
        const response = await fetch(`/api/products/${product_id}/img`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log("Fetch product images failed");
        }
        return response.json();;
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllProductImg = async () => {
    try {
        const response = await fetch(`/api/products/img`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log("Fetch all product images failed");
        }
        return response.json();;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCategories = async () => {
    try {
        const response = await fetch(`/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log("Fetch categories failed");
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

// Orders

export const fetchOrdersByUser = async (userId) => {
    try {
        const response = await fetch(`/api/orders/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
