// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import './Header.css'

const Header = ({ setView }) => {
    const { user } = useAuth();

    return (
        <header className="header">
            <div className="logo">
                <h1>Supermercado</h1>
            </div>
            <nav>
                {user ? (
                    <span className="welcome-message">Bem vindo, {user.firstName}</span>
                ) : (
                    <>
                        <button onClick={() => setView('login')}>Entrar</button>
                        <button onClick={() => setView('register')}>Cadastrar</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
