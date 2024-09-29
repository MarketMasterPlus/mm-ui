// mm-ui/src/components/Login.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext.jsx'; // Ensure this path matches where AuthContext is located
import { loginCustomer } from '../services/customerService.js';
import '../css/Password.css'; // Add a new CSS file for styling the input and icon

const Login = ({setView}) => {
    const [emailOrCpf, setEmailOrCpf] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const { handleLoginSuccess } = useAuth(); // Get handleLoginSuccess from AuthContext

    const handleLogin = async () => {
        try {
            const response = await loginCustomer({ emailOrCpf, password });
            if (response.token) {
                // Set the cookie with the token, expires in 1 day
                Cookies.set('token', response.token, { expires: 1, secure: true, sameSite: 'strict' });

                // Handle setting the user context with the login details
                handleLoginSuccess({
                    fullname: response.fullname,
                    email: response.email,
                    cpf: response.cpf,
                    addressid: response.addressid,
                });

                alert('Login realizado com sucesso!');

                setView(null); // Redirect the user to the home view
            } else {
                throw new Error('Token not received');
            }
        } catch (error) {
            alert('Erro ao realizar login: ' + error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                <div className="password-input-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={togglePasswordVisibility}
                    >
                        <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}></i>
                    </button>
                </div>
            </div>
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};
Login.propTypes = {
    setView: PropTypes.func.isRequired,
};

export default Login;
