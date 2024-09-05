// src/services/customerService.js

export const registerCustomer = async (customerData) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_MM_CUSTOMER_API_URL}/register`, {
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
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_MM_CUSTOMER_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrCpf, password }),
    });

    if (!response.ok) {
        throw new Error('Erro ao realizar login');
    }

    return response.json();
};
