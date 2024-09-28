// src/services/customerService.js

export const registerCustomer = async (customerData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_MM_CUSTOMER_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering customer:", error);
    throw error; // Re-throw to handle it in the calling function
  }
};

export const loginCustomer = async ({ emailOrCpf, password }) => {
  const response = await fetch(
    `${import.meta.env.VITE_MM_CUSTOMER_API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: emailOrCpf, password }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

export const fetchCustomerDetails = async (cpf) => {
  const response = await fetch(
    `${import.meta.env.VITE_MM_CUSTOMER_API_URL}/customers/${cpf}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

export const updateCustomer = async (cpf, customer) => {
  const response = await fetch(
    `${import.meta.env.VITE_MM_CUSTOMER_API_URL}/customers/${cpf}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update customer");
  }
  return response.json();
};
