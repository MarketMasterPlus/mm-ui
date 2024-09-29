// src/components/MyStores.jsx

import React, { useState, useEffect } from 'react';
import { fetchStores, deleteStore, fetchStoresByCity } from '../services/storeService.js';
import StoreCard from './StoreCard.jsx';
import StoreRegistration from './StoreRegistration.jsx'; // Ensure this is imported
import { useAuth } from '../context/AuthContext.jsx';
import '../css/MyStores.css';

const MyStores = () => {
    const { user } = useAuth();
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [editingStoreId, setEditingStoreId] = useState(null);
    const [filters, setFilters] = useState({ name: '', cnpj: '', city: '' });

    const loadStores = async () => {
        setIsLoading(true);
        setErrors(null);
        try {
            let fetchedStores = null;
            if(filters.city) {
                fetchedStores = await fetchStoresByCity({ ...filters, ownerid: user.cpf });
            } 
            else {
                fetchedStores = await fetchStores({ ...filters, ownerid: user.cpf });
            }
            setStores(fetchedStores);
        } catch (error) {
            setErrors('Failed to load your stores: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadStores();
    }, [filters, user.cpf]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleDelete = async (storeId) => {
        if (window.confirm('Tem certeza que deseja deletar esta loja?')) {
            try {
                await deleteStore(storeId);
                alert('Loja deletada com sucesso!');
                loadStores();
            } catch (error) {
                alert('Erro ao deletar a loja: ' + error.message);
            }
        }
    };

    const handleEdit = (storeId) => {
        setEditingStoreId(storeId);
    };

    const handleEditSuccess = () => {
        setEditingStoreId(null);
        loadStores();
    };

    return (
        <div className="my-stores">
            <h2>Meus Mercados</h2>
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
            </div>
            {isLoading && <div>Carregando...</div>}
            {errors && <div className="error">{errors}</div>}
            {editingStoreId ? (
                <StoreRegistration storeId={editingStoreId} onSuccess={handleEditSuccess} />
            ) : (
                <div className="store-grid">
                    {stores.map((store) => (
                        <StoreCard
                            key={store.id}
                            store={store}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyStores;
