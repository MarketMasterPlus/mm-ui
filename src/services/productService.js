// src/services/productService.js

const baseURL = import.meta.env.VITE_MM_PRODUCT_API_URL;

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${baseURL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${baseURL}/products`, {
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

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${baseURL}/category`);
        if (!response.ok) {
            throw new Error('Error fetching categories');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const createCategory = async (name) => {
    try {
        const response = await fetch(`${baseURL}/category`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
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
