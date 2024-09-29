// src/components/StoreList.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchStores, fetchStoresByCity } from '../services/storeService.js';
import StoreCard from './StoreCard.jsx';
import '../css/StoreList.css';

const StoreList = ({ user }) => {
    const [stores, setStores] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        cnpj: '',
        city: '',
        ownerid: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const loadStores = async () => {
        setIsLoading(true);
        setErrors(null);
        try {
            let fetchedStores = null;
            if(filters.city) {
                fetchedStores = await fetchStoresByCity(filters);
            }
            else {
                fetchedStores = await fetchStores(filters);
            }
            setStores(fetchedStores);
        } catch (error) {
            setErrors('Failed to load stores: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadStores();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="store-list">
            <h2>Lista de Mercados</h2>
            <div className="search-bar">
                <input
                    name="name"
                    type="text"
                    placeholder="Pesquisar por nome..."
                    value={filters.name}
                    onChange={handleChange}
                />
                <input
                    name="cnpj"
                    type="text"
                    placeholder="Pesquisar por CNPJ..."
                    value={filters.cnpj}
                    onChange={handleChange}
                />
                <input
                    name="city"
                    type="text"
                    placeholder="Pesquisar por cidade..."
                    value={filters.city}
                    onChange={handleChange}
                />
                <input
                    name="ownerid"
                    type="text"
                    placeholder="Pesquisar por CPF do proprietário..."
                    value={filters.ownerid}
                    onChange={handleChange}
                />
            </div>
            {isLoading && <div>Carregando...</div>}
            {errors && <div className="error">{errors}</div>}
            <div className="store-grid">
                {stores.map((store) => (
                    <StoreCard
                        key={store.id}
                        store={store}
                        onEdit={null}  // Edit and delete functions should be passed only if the user is the owner
                        onDelete={null}
                        onProducts={() => console.log('Opening products for', store.name)}
                        user={user}
                    />
                ))}
            </div>
        </div>
    );
};

StoreList.propTypes = {
    user: PropTypes.object.isRequired
};

export default StoreList;
