// mm-ui/src/components/CustomerRegistration.jsx

import React, { useState } from 'react';
import AddressForm from './AddressForm.jsx';
import { registerCustomer } from '../services/customerService.js';

const CustomerRegistration = () => {
    const [customer, setCustomer] = useState({
        full_name: '',
        cpf: '',
        email: '',
        password: '',
    });

    const [address, setAddress] = useState({
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
    });

    const handleRegister = async () => {
        try {
            // Destructure id out of the customer and address objects and only send the rest
            const { id: customerId, ...customerData } = customer;
            const { id: addressId, ...addressData } = address;

            await registerCustomer({ ...customerData, ...addressData });
            alert('Cliente registrado com sucesso!');
        } catch (error) {
            alert('Erro ao registrar cliente: ' + error.message);
        }
    };


    return (
        <div className="customer-registration">
            <h2>Cadastro de Cliente</h2>
            <div className="form-group">
                <label>Nome Completo</label>
                <input
                    type="text"
                    value={customer.full_name}
                    onChange={(e) => setCustomer({ ...customer, full_name: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>CPF</label>
                <input
                    type="text"
                    value={customer.cpf}
                    onChange={(e) => setCustomer({ ...customer, cpf: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="text"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <input
                    type="password"
                    value={customer.password}
                    onChange={(e) => setCustomer({ ...customer, password: e.target.value })}
                />
            </div>

            <AddressForm address={address} setAddress={setAddress} />

            <button onClick={handleRegister}>Registrar Cliente</button>
        </div>
    );
};

export default CustomerRegistration;
