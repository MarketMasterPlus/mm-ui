import React from 'react';

const Header = ({ setView }) => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Supermercado</h1>
            </div>
            <nav>
                <button onClick={() => setView('login')}>Entrar</button>
                <button onClick={() => setView('register')}>Cadastrar</button>
            </nav>
        </header>
    );
};

export default Header;
