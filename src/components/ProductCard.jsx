// src/components/ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <h4>{product.name}</h4>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <div className="actions">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired
    }).isRequired,
};

export default ProductCard;
