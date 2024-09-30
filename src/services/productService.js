// src/services/productService.js

const baseURL = import.meta.env.VITE_MM_PRODUCT_API_URL;

// Fetch Products with optional filters
export const fetchProducts = async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.name) queryParams.append("name", filters.name);
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.description) queryParams.append("description", filters.description);
    if (filters.brand) queryParams.append("brand", filters.brand);

    try {
        const response = await fetch(`${baseURL}/mm-product/?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Create a Product
export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${baseURL}/mm-product/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error('Error creating product');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Fetch a single Product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${baseURL}/mm-product/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch product with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

// Update a Product
export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${baseURL}/mm-product/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error(`Failed to update product with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete a Product
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${baseURL}/mm-product/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete product with ID ${id}`);
        }
        return true;  // Return true on successful deletion
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Fetch all categories
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${baseURL}/category`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Fetch all categories
export const fetchCategoryById = async (id) => {
    try {
        const response = await fetch(`${baseURL}/category/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch category');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
}

// Create a Category
export const createCategory = async (categoryData) => {
    try {
        const response = await fetch(`${baseURL}/category`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoryData)
        });
        if (!response.ok) {
            throw new Error('Error creating category');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Update a Category
export const updateCategory = async (id, categoryData) => {
    try {
        const response = await fetch(`${baseURL}/category/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoryData)
        });
        if (!response.ok) {
            throw new Error(`Failed to update category with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Delete a Category
export const deleteCategory = async (id) => {
    try {
        const response = await fetch(`${baseURL}/category/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete category with ID ${id}`);
        }
        return true;  // Return true on successful deletion
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};
