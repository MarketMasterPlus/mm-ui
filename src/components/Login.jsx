// mm-ui/src/components/Login.jsx

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext.jsx';
import { loginCustomer } from '../services/customerService.js';

const Login = () => {
    const [emailOrCpf, setEmailOrCpf] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth(); // Get setUser from AuthContext

    const handleLogin = async () => {
        try {
            const response = await loginCustomer({ emailOrCpf, password });
            if (response.token) {
                // Set the cookie with the token, expires in 1 day
                Cookies.set('token', response.token, { expires: 1, secure: true, sameSite: 'strict' });
                // Extract the first name from the fullName
                const firstName = response.fullName.split(' ')[0];
                setUser({ firstName }); // Set user in context with firstName extracted
                alert('Login realizado com sucesso!');
            } else {
                throw new Error('Token not received');
            }
        } catch (error) {
            alert('Erro ao realizar login: ' + error.message);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <div className="form-group">
                <label>Email ou CPF</label>
                <input
                    type="text"
                    value={emailOrCpf}
                    onChange={(e) => setEmailOrCpf(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default Login;
