// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CustomerRegistration from './components/CustomerRegistration.jsx';
import Login from './components/Login.jsx';
import CustomerProfile from './components/CustomerProfile.jsx'; // Make sure this is imported
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css';

function App() {
    const [view, setView] = useState(null);

    return (
        <AuthProvider>
            <div className="App">
                <Header setView={setView} />

                {view === 'login' && <Login setView={setView} />}
                {view === 'register' && <CustomerRegistration />}
                {view === 'profile' && <CustomerProfile setView={setView} />}

                {view === null && (
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
