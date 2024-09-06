// mm-ui/src/components/AddressForm.jsx
import React, { useState, useEffect } from 'react';
import { fetchAddressByCep } from '../services/cepService.js';

// Helper function to format the CEP as NN.NNN-NNN
const formatCep = (value) => {
    const numericCep = value.replace(/\D/g, ''); // Remove all non-numeric characters
    if (numericCep.length <= 5) {
        return numericCep;
    }
    return `${numericCep.slice(0, 2)}.${numericCep.slice(2, 5)}-${numericCep.slice(5, 8)}`;
};

const AddressForm = ({ address, setAddress }) => {
    const [cep, setCep] = useState(formatCep(address.cep || ''));

    // Ensure the cep is correctly formatted when the component loads
    useEffect(() => {
        if (address.cep) {
            setCep(formatCep(address.cep));
        }
    }, [address.cep]);

    const handleCepChange = (e) => {
        const formattedCep = formatCep(e.target.value);
        setCep(formattedCep);
    };

    const handleCepSearch = async () => {
        try {
            const cleanCep = cep.replace(/\D/g, ''); // Strip formatting (leave only numbers)

            if (!cleanCep) {
                alert('Por favor, insira um CEP válido.');
                return;
            }

            const addressInfo = await fetchAddressByCep(cleanCep);

            setAddress({
                ...address,
                ...addressInfo,
                number: addressInfo.number || address.number, // Preserve the existing number if not provided
                id: address.id // Preserve the current address ID
            });
        } catch (error) {
            alert('CEP não encontrado!');
        }
    };

    return (
        <div className="address-form">
            <div className="form-group">
                <label>CEP</label>
                <input
                    type="text"
                    value={cep}
                    onChange={handleCepChange} // Format the CEP as the user types
                />
                <button onClick={handleCepSearch}>Buscar CEP</button>
            </div>
            <div className="form-group">
                <label>Rua</label>
                <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Número</label>
                <input
                    type="text"
                    value={address.number || ''} // Ensure this handles null values
                    onChange={(e) => setAddress({ ...address, number: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Bairro</label>
                <input
                    type="text"
                    value={address.neighborhood}
                    onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Cidade</label>
                <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Estado</label>
                <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                />
            </div>
        </div>
    );
};

export default AddressForm;
