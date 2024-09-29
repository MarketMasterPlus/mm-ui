// src/components/Header.jsx
import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext.jsx";
import Cookies from "js-cookie";
import "../css/Header.css";

const Header = ({ setView }) => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    setView("login");
  };

  const firstName = user?.fullname.split(" ")[0];

  return (
    <header className="header">
      <div className="top-row">
        <div className="logo">
          <h1>Market Master</h1>
        </div>
        {user && (
          <>
            <div className="top-right">
              <span className="welcome-message">Olá, {firstName.toUpperCase()}</span>
              <nav>
                <button onClick={() => setView(null)}>Home</button>
                <button onClick={() => setView("market")}>Mercado</button>
                <button onClick={() => setView("profile")}>Perfil</button>
                <button onClick={handleLogout}>Sair</button>
              </nav>
            </div>
          </>
        )}
        {!user && (
          <>
            <div className="top-right">
              <span className="welcome-guest">.</span>
              <nav>
                <button onClick={() => setView("login")}>Entrar</button>
                <button onClick={() => setView("register")}>Cadastrar</button>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Header;
