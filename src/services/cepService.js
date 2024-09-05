// src/services/cepService.js

export const fetchAddressByCep = async (cep) => {
    console.log(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/viacep/${cep}`);
    const response = await fetch(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/viacep/${cep}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar o endereço via CEP');
    }

    return response.json();
};
