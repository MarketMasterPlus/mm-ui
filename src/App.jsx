import React, { useState } from 'react';
import Header from './components/Header';
import CustomerRegistration from './components/CustomerRegistration';
import Login from './components/Login';
import './App.css';

function App() {
    const [view, setView] = useState(null);

    return (
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
    );
}

export default App;
