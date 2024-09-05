// mm-ui/src/components/AddressForm.jsx

import React, { useState } from 'react';
import { fetchAddressByCep } from '../services/cepService.js';

const AddressForm = ({ address, setAddress }) => {
    const [cep, setCep] = useState('');

    const handleCepSearch = async () => {
        try {
            console.log("aqui")
            const addressInfo = await fetchAddressByCep(cep);
            setAddress({ ...address, ...addressInfo });
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
                    onChange={(e) => setCep(e.target.value)}
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
                    value={address.number}
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
