// src/services/customerService.js

export const registerCustomer = async (customerData) => {
    const response = await fetch(`${import.meta.env.VITE_MM_CUSTOMER_API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
    });

    if (!response.ok) {
        throw new Error('Erro ao registrar cliente');
    }

    return response.json();
};

export const loginCustomer = async ({ emailOrCpf, password }) => {
    const response = await fetch(`${import.meta.env.VITE_MM_CUSTOMER_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: emailOrCpf, password }),
    });

    if (!response.ok) {
        throw new Error('Erro ao realizar login');
    }

    return response.json();
};

export const fetchCustomerDetails = async (cpf) => {
    const response = await fetch(`${import.meta.env.VITE_MM_CUSTOMER_API_URL}/customers/${cpf}`);
    if (!response.ok) {
        throw new Error('Failed to fetch customer details');
    }
    return response.json();
};

export const fetchAddressById = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/mm-address/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch address details');
    }
    return response.json();
}

export const updateCustomer = async (cpf, customerData) => {
    const response = await fetch(`${import.meta.env.VITE_MM_CUSTOMER_API_URL}/customers/${cpf}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
    });

    if (!response.ok) {
        throw new Error('Failed to update customer details');
    }
    return response.json();
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
        throw new Error('Failed to update address details');
    }
    return response.json();
};