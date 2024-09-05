import React, { useState } from 'react';
import { loginCustomer } from '../services/customerService';

const Login = () => {
    const [emailOrCpf, setEmailOrCpf] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await loginCustomer({ emailOrCpf, password });
            alert('Login realizado com sucesso!');
        } catch (error) {
            alert('Erro ao realizar login.');
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
