// src/components/ProductRegistration.jsx
import React, { useState, useEffect } from 'react';
import { createProduct, fetchCategories, createCategory } from '../services/productService';

const ProductRegistration = ({ storeId }) => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        brand: '',
        category: '',
        suggestedprice: '',
        imageurl: '',
        price: '',
        stock: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        };

        loadCategories();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newProduct = await createProduct({
                ...productData,
                storeId,
                categories: productData.category.split(',').map(cat => cat.trim())
            });
            console.log('Product created:', newProduct);
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleInputChange} />
            <input type="text" name="description" placeholder="Description" value={productData.description} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={productData.brand} onChange={handleInputChange} />
            <input type="text" name="category" placeholder="Category" value={productData.category} onChange={handleInputChange} />
            <input type="number" name="suggestedprice" placeholder="Suggested Price" value={productData.suggestedprice} onChange={handleInputChange} />
            <input type="text" name="imageurl" placeholder="Image URL" value={productData.imageurl} onChange={handleInputChange} />
            <input type="number" name="price" placeholder="Price" value={productData.price} onChange={handleInputChange} />
            <input type="number" name="stock" placeholder="Amount in Stock" value={productData.stock} onChange={handleInputChange} />
            <button type="submit">Register Product</button>
        </form>
    );
};

export default ProductRegistration;
