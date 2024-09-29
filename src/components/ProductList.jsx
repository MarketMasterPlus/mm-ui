// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchInventoryByStore } from '../services/inventoryService';
import ProductCard from './ProductCard';

const ProductList = ({ storeId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchInventoryByStore(storeId);
            setProducts(fetchedProducts);
        };

        loadProducts();
    }, [storeId]);

    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
ProductList.propTypes = {
    storeId: PropTypes.string.isRequired,
};

export default ProductList;
