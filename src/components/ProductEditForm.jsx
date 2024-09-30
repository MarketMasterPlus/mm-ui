// src/components/ProductEditForm.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateProduct, fetchProductById, fetchCategories } from '../services/productService';

const ProductEditForm = ({ productId, setView }) => {
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
        const loadData = async () => {
            const fetchedProduct = await fetchProductById(productId);
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
            setProductData({ ...fetchedProduct, category: fetchedCategories.find(cat => cat.id === fetchedProduct.categoryId)?.name });
        };

        loadData();
    }, [productId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProduct(productId, {
                ...productData,
                category: categories.find(cat => cat.name === productData.category)?.id
            });
            alert('Product updated successfully!');
            setView('list');
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Failed to update product.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-edit-form">
            {/* Form inputs similar to the ProductRegistration component */}
            <button type="submit">Update Product</button>
        </form>
    );
};

ProductEditForm.propTypes = {
    productId: PropTypes.number.isRequired,
    setView: PropTypes.func.isRequired
};

export default ProductEditForm;
