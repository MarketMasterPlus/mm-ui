import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductList from './ProductList';
import ProductRegistration from './ProductRegistration';
import '../css/ProductPanel.css';

const ProductPanel = ({ storeId }) => {
    const [view, setView] = useState('list'); // 'list' or 'register'

    return (
        <div className="product-panel">
            <aside className="sidebar">
                <button onClick={() => setView('list')}>Listar Produtos</button>
                <button onClick={() => setView('register')}>Cadastrar Produto</button>
            </aside>
            <main className="content">
                {view === 'list' ? <ProductList storeId={storeId} /> : <ProductRegistration storeId={storeId} />}
            </main>
        </div>
    );
};

ProductPanel.propTypes = {
    storeId: PropTypes.string.isRequired
};

export default ProductPanel;
