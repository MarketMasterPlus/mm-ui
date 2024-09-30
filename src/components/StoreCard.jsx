// src/components/StoreCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import '../css/StoreCard.css';

const StoreCard = ({ store, onEdit, onDelete, onProducts }) => {
    return (
        <div className="store-card">
            <h3>{store.name}</h3>
            <p>CNPJ: {store.cnpj}</p>
            <p>Cidade: {store.city || 'N/A'}</p>
            {store.imageurl && (
                <div className="store-image" style={{ backgroundImage: `url(${store.imageurl})` }}></div>
            )}
            <div className="store-actions">
                {onEdit && <button onClick={() => onEdit(store.id)}>Editar</button>}
                {onDelete && <button onClick={() => onDelete(store.id)}>Deletar</button>}
                <button onClick={() => onProducts(store.id)}>Produtos</button>
            </div>
        </div>
    );
};

StoreCard.propTypes = {
    store: PropTypes.shape({
        name: PropTypes.string.isRequired,
        cnpj: PropTypes.string.isRequired,
        city: PropTypes.string,
        imageurl: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onProducts: PropTypes.func.isRequired,
};

export default StoreCard;
