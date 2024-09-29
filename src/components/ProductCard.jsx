import React from 'react';
import PropTypes from 'prop-types';
import '../css/ProductCard.css';

const ProductCard = ({ product, onDelete, onEdit }) => {
    return (
        <div className="product-card">
            <h4>{product.name}</h4>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <div className="actions">
                <button onClick={() => onEdit(product.id)}>Edit</button>
                <button onClick={() => onDelete(product.id)}>Delete</button>
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
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default ProductCard;
