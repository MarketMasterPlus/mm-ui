// src/components/StoreRegistration.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddressForm from './AddressForm.jsx';
import { createStore, updateStore, fetchStoreDetails } from '../services/storeService.js';
import { createOrUpdateAddress, deleteAddress, fetchAddressById } from '../services/addressService.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../css/StoreRegistration.css';

const StoreRegistration = ({ storeId, onSuccess, onCancel }) => {
    const { user } = useAuth();

    const initialStoreState = {
        name: '',
        cnpj: '',
        imageurl: '',
        ownerid: user?.cpf || '',
    };

    const [originalStore, setOriginalStore] = useState(null);
    const [store, setStore] = useState(initialStoreState);
    const [address, setAddress] = useState({
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadStoreData = async () => {
            if (storeId) {
                setIsLoading(true);
                try {
                    const storeDetails = await fetchStoreDetails(storeId);
                    const fetchedStore = {
                        name: storeDetails.name,
                        cnpj: storeDetails.cnpj,
                        imageurl: storeDetails.imageurl || '',
                        ownerid: storeDetails.ownerid,
                    };
                    setStore(fetchedStore);
                    setOriginalStore(fetchedStore); // Store original data

                    const addressDetails = await fetchAddressById(storeDetails.addressid);
                    setAddress({
                        cep: addressDetails.cep,
                        street: addressDetails.street,
                        number: addressDetails.number,
                        neighborhood: addressDetails.neighborhood,
                        city: addressDetails.city,
                        state: addressDetails.state,
                        complement: addressDetails.complement || '',
                        id: addressDetails.id,
                    });
                } catch (error) {
                    setErrors({ load: 'Failed to load store data.' });
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadStoreData();
    }, [storeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const addressData = {
                cep: address.cep.replace(/\D/g, ''),
                street: address.street,
                number: address.number,
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state,
                complement: address.complement,
            };

            const addressResponse = await createOrUpdateAddress(addressData, address.id);
            const addressId = addressResponse.id.toString();

            const storeData = {
                ...store,
                addressid: addressId,
                ownerid: user.cpf,
            };

            if (storeId) {
                await updateStore(storeId, storeData);
                alert('Loja atualizada com sucesso!');
            } else {
                await createStore(storeData);
                alert('Loja criada com sucesso!');
            }

            onSuccess();
        } catch (error) {
            setErrors({ submit: error.message });
            if (!storeId && address.id) {
                await deleteAddress(address.id);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (storeId && originalStore) {
            // Restore original data if editing
            setStore(originalStore);
        } else {
            // Clear all fields if creating
            setStore(initialStoreState);
            setAddress({});
        }
        onCancel();
    };

    return (
        <div className="store-registration">
            <h2>{storeId ? 'Editar Loja' : 'Criar Nova Loja'}</h2>
            {errors.load && <div className="error">{errors.load}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome da Loja</label>
                    <input
                        type="text"
                        value={store.name}
                        onChange={(e) => setStore({ ...store, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CNPJ</label>
                    <input
                        type="text"
                        value={store.cnpj}
                        onChange={(e) => setStore({ ...store, cnpj: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>URL da Imagem</label>
                    <input
                        type="url"
                        value={store.imageurl}
                        onChange={(e) => setStore({ ...store, imageurl: e.target.value })}
                    />
                </div>
                <AddressForm address={address} setAddress={setAddress} preventDefault={true} />
                {errors.submit && <div className="error">{errors.submit}</div>}
                <button type="submit" disabled={isLoading}>Salvar</button>
                <button type="button" onClick={handleCancel} disabled={isLoading}>Cancelar</button>
            </form>
        </div>
    );
};

StoreRegistration.propTypes = {
    storeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};

export default StoreRegistration;
