// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CustomerRegistration from './components/CustomerRegistration.jsx';
import Login from './components/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider
import './App.css';

function App() {
    const [view, setView] = useState(null);

    return (
        <AuthProvider> {/* Wrap everything inside AuthProvider */}
            <div className="App">
                <Header setView={setView} />

                {view === 'login' && <Login />}
                {view === 'register' && <CustomerRegistration />}

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
