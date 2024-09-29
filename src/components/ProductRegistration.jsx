import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createProduct, fetchCategories, createCategory } from '../services/productService';
import '../css/ProductRegistration.css';

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
            setCategories(fetchedCategories.map(cat => cat.name));
        };

        loadCategories();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryInput = async (event) => {
        const newCategory = event.target.value;
        if (newCategory && !categories.includes(newCategory)) {
            const createdCategory = await createCategory({ name: newCategory });
            if (createdCategory) {
                setCategories([...categories, createdCategory.name]);
                setProductData(prev => ({
                    ...prev,
                    category: [...prev.category.split(',').map(cat => cat.trim()), createdCategory.name].join(',')
                }));
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const categoryNames = productData.category.split(',').map(cat => cat.trim());
        try {
            const categoryIds = await Promise.all(categoryNames.map(async (name) => {
                if (!categories.includes(name)) {
                    const newCat = await createCategory({ name });
                    return newCat.id;
                }
                return categories.find(cat => cat.name === name).id;
            }));

            const newProduct = await createProduct({
                ...productData,
                storeId,
                categories: categoryIds
            });
            console.log('Product created:', newProduct);
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-registration-form">
            <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleInputChange} />
            <input type="text" name="description" placeholder="Description" value={productData.description} onChange={handleInputChange} />
            <input type="text" name="brand" placeholder="Brand" value={productData.brand} onChange={handleInputChange} />
            <input type="text" name="category" placeholder="Category" value={productData.category} onChange={handleCategoryInput} />
            <input type="number" name="suggestedprice" placeholder="Suggested Price" value={productData.suggestedprice} onChange={handleInputChange} />
            <input type="text" name="imageurl" placeholder="Image URL" value={productData.imageurl} onChange={handleInputChange} />
            <input type="number" name="price" placeholder="Price" value={productData.price} onChange={handleInputChange} />
            <input type="number" name="stock" placeholder="Amount in Stock" value={productData.stock} onChange={handleInputChange} />
            <button type="submit">Register Product</button>
        </form>
    );
};

ProductRegistration.propTypes = {
    storeId: PropTypes.string.isRequired
};

export default ProductRegistration;
