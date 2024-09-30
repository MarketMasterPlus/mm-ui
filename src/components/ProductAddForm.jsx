// src/components/ProductAddForm.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createProduct, fetchCategories, createCategory } from '../services/productService';

const ProductAddForm = ({ storeId, setView }) => {
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

    const handleCategoryInput = async (event) => {
        const newCategory = event.target.value;
        if (!categories.find(cat => cat.name === newCategory)) {
            const createdCategory = await createCategory({ name: newCategory });
            setCategories([...categories, createdCategory]);
        }
        setProductData(prev => ({
            ...prev,
            category: newCategory
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newProduct = await createProduct({
                ...productData,
                storeId,
                category: categories.find(cat => cat.name === productData.category)?.id
            });
            alert('Product created successfully!');
            setView('list');
        } catch (error) {
            console.error('Failed to create product:', error);
            alert('Failed to create product.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-add-form">
            {/* Form inputs similar to the ProductRegistration component */}
            <button type="submit">Add Product</button>
        </form>
    );
};

ProductAddForm.propTypes = {
    storeId: PropTypes.number.isRequired,
    setView: PropTypes.func.isRequired
};

export default ProductAddForm;
