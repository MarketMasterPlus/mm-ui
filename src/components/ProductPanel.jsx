// src/components/ProductPanel.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductList from './ProductList.jsx';
import ProductAddForm from './ProductAddForm.jsx';
import ProductEditForm from './ProductEditForm.jsx';
import '../css/ProductPanel.css';

const ProductPanel = ({ storeId }) => {
    const [productView, setProductView] = useState('list');  // 'list', 'add', 'edit'

    const renderContent = () => {
        switch (productView) {
            case 'list':
                return <ProductList storeId={storeId} setProductView={setProductView} />;
            case 'add':
                return <ProductAddForm storeId={storeId} setProductView={setProductView} />;
            case 'edit':
                return <ProductEditForm storeId={storeId} setProductView={setProductView} />;
            default:
                return <ProductList storeId={storeId} setProductView={setProductView} />;
        }
    };

    return (
        <div className="product-panel">
            <aside className="sidebar">
                <button onClick={() => setProductView('list')}>Listar Produtos</button>
                <button onClick={() => setProductView('add')}>Adicionar Produtos</button>
            </aside>
            <main className="content">
                {renderContent()}
            </main>
        </div>
    );
};
ProductPanel.propTypes = {
    storeId: PropTypes.number.isRequired,
};

export default ProductPanel;
