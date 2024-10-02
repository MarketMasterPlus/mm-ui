// src/components/MarketPanel.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StoreRegistration from './StoreRegistration.jsx';
import StoreList from './StoreList.jsx';
import MyStores from './MyStores.jsx';
import ProductPanel from './ProductPanel.jsx'; // Import ProductPanel component
import '../css/MarketPanel.css';

const MarketPanel = ({setView}) => {
    const [marketView, setMarketView] = useState('stores'); // 'stores', 'myStores', 'createStore', 'productPanel'

    const handleProductView = (storeId) => {
        setView({ view: 'product', storeId: storeId }); // Pass storeId to productPanel
    };

    const renderContent = () => {
        switch (marketView.view || marketView) { // Check if view is an object or string
            case 'stores':
                return <StoreList setView={setView} />;
            case 'myStores':
                return <MyStores setView={setView} handleProductView={handleProductView} />;
            case 'createStore':
                return <StoreRegistration onSuccess={() => setMarketView('myStores')} />;
            case 'product':
                setView({view: 'product', storeId: marketView.storeId}); // Pass storeId to productPanel
                return <ProductPanel storeId={marketView.storeId} />;
            default:
                return <StoreList setView={setView} />;
        }
    };

    return (
        <div className="market-panel">
            <aside className="sidebar">
                <button onClick={() => setMarketView('stores')}>Mercados</button>
                <button onClick={() => setMarketView('myStores')}>Meus Mercados</button>
                <button onClick={() => setMarketView('createStore')}>Criar Mercado</button>
            </aside>
            <main className="content">
                {renderContent()}
            </main>
        </div>
    );
};
MarketPanel.propTypes = {
    setView: PropTypes.func.isRequired,
};

export default MarketPanel;
