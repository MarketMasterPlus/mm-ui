// src/components/CustomerRegistration.jsx

import React, { useState } from 'react';
import AddressForm from './AddressForm.jsx';
import { registerCustomer } from '../services/customerService.js';
import { createOrUpdateAddress, deleteAddress } from '../services/addressService.js';

const CustomerRegistration = () => {
    const [customer, setCustomer] = useState({
        fullname: '',
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
        complement: ''
    });

    const handleRegister = async () => {
        let addressId = null;
        try {
            // First, attempt to create or update the address
            const addressResponse = await createOrUpdateAddress({
                cep: address.cep.replace(/\D/g, ''), // Ensuring only digits for cep
                street: address.street,
                number: address.number,
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state,
                complement: address.complement
            });
    
            addressId = addressResponse.id.toString(); // Ensuring we get the address ID from the response

            // Now, prepare the customer data with the obtained addressId
            const customerData = {
                ...customer,
                addressid: addressId
            };
    
            await registerCustomer(customerData);
    
            alert('Cliente registrado com sucesso!');
        } catch (error) {
            alert('Erro ao registrar cliente: ' + error.message);
            if (addressId) {
                await deleteAddress(addressId); // Rollback the address creation/update if addressId was set
            }
        }
    };
    
    return (
        <div className="customer-registration">
            <h2>Cadastro de Cliente</h2>
            <div className="form-group">
                <label>Nome Completo</label>
                <input
                    type="text"
                    value={customer.fullname}
                    onChange={(e) => setCustomer({ ...customer, fullname: e.target.value })}
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
