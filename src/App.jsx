// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CustomerRegistration from './components/CustomerRegistration.jsx';
import Login from './components/Login.jsx';
import CustomerProfile from './components/CustomerProfile.jsx'; // Make sure this is imported
import { AuthProvider } from './context/AuthContext.jsx';
import MarketPanel from './components/MarketPanel.jsx'; // Make sure this import is correct
import './App.css';
import ProductPanel from './components/ProductPanel.jsx'; // Make sure this import is correct

function App() {
    const [view, setView] = useState({view: 'home'});

    console.log("Current view state:", view); 

    return (
        <AuthProvider>
            <div className="App">
                <Header setView={setView} />

                {view.view === 'login' && <Login setView={setView} />}
                {view.view === 'register' && <CustomerRegistration />}
                {view.view === 'profile' && <CustomerProfile setView={setView} />}
                {view.view === 'market' && <MarketPanel setView={setView} />} 
                {view.view === 'product' && <ProductPanel storeId={view.storeId}/>}
                
                {view.view === 'home' && (
                    <div className="home-content">
                        <h2>Bem-vindo ao Market Master!</h2>
                        <p>Compre os melhores e mais baratos produtos no conforto da sua casa.</p>
                    </div>
                )}
            </div>
        </AuthProvider>
    );
}

export default App;
