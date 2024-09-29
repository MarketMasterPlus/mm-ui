// src/components/MarketPanel.jsx

import React, { useState } from 'react';
import StoreRegistration from './StoreRegistration.jsx';
import StoreList from './StoreList.jsx';
import MyStores from './MyStores.jsx';
import '../css/MarketPanel.css';

const MarketPanel = () => {
    const [marketView, setMarketView] = useState('stores'); // 'stores', 'myStores', 'createStore'

    const renderContent = () => {
        switch (marketView) {
            case 'stores':
                return <StoreList />;
            case 'myStores':
                return <MyStores />;
            case 'createStore':
                return <StoreRegistration onSuccess={() => setMarketView('myStores')} />;
            default:
                return <StoreList />;
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

export default MarketPanel;
