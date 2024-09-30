// mm-ui/src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData, token) => {
        // Assuming userData contains fullname, cpf, email, etc.
        setUser({
            cpf: userData.cpf,
            fullname: userData.fullname,
            email: userData.email,
            addressid: userData.addressid
        });
        // Store the token in a cookie
        Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'strict' });
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleLoginSuccess, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
