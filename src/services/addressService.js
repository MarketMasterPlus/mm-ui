// src/services/addressService.js

export const fetchAddressByCep = async (cep) => {
    const response = await fetch(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/viacep/${cep}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message);
    }

    return response.json();
};


export const fetchAddressById = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/mm-address/${id}`);
    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message);
    }
    return response.json();
}

export const createOrUpdateAddress = async (address) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/mm-address/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message);
            }

        return await response.json();
    } catch (error) {
        console.error('Error creating or updating address:', error);
        throw error; // Re-throw to handle it in the calling function
    }
};


export const updateAddress = async (id, addressData) => {
    console.log(addressData)
    const response = await fetch(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/mm-address/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
    });

    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message);
    }
    return response.json();
};

export const deleteAddress = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/mm-address/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        // We're assuming the response might still have a JSON body on error
        const errorData = await response.text().then(text => text ? JSON.parse(text) : {});
        throw new Error(errorData.message || 'Failed to delete address');
    }
    return true;
}