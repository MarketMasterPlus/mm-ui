// src/components/Header.jsx
import React from 'react';
import {useAuth} from '../context/AuthContext.jsx';
import Cookies from 'js-cookie';
import './Header.css';

const Header = ({setView}) => {
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        Cookies.remove('token'); // Remove the token from cookies
        setUser(null); // Clear the user context
        setView(null); // Optionally redirect the user to the home view
    };

    const firstName = user?.fullname.split(' ')[0];

    return (
        <header className="header">
            <div className="logo">
                <h1>Market Master</h1>
            </div>
            <nav>
                {user ? (
                    <>
                        <span className="welcome-message">Bem vindo, {firstName}</span>
                        <button onClick={() => setView(null)}>Home</button>
                        <button onClick={() => setView('profile')}>Perfil</button>
                        <button onClick={handleLogout}>Sair</button>
                        {/* Additional buttons can be added here */}
                    </>
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
