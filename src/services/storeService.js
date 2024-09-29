// src/services/storeService.js

import { deleteAddress } from './addressService.js'; 

export const fetchStores = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.name) queryParams.append("name", filters.name);
  if (filters.cnpj) queryParams.append("cnpj", filters.cnpj);
  if (filters.addressid) queryParams.append("addressid", filters.addressid);
  if (filters.ownerid) queryParams.append("ownerid", filters.ownerid);

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_MM_STORE_API_URL
      }/mm-store/?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch stores");
    }

    const stores = await response.json();
    const addressIds = stores.map((store) => store.addressid);
    const addresses = await fetchStoreAddresses(addressIds);

    const storesWithCity = stores.map((store) => ({
      ...store,
      city: addresses[store.addressid]?.city || "N/A",
    }));

    return storesWithCity;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};

export const fetchStoresByCity = async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.name) queryParams.append("name", filters.name);
    if (filters.cnpj) queryParams.append("cnpj", filters.cnpj);
    if (filters.addressid) queryParams.append("addressid", filters.addressid);
    if (filters.ownerid) queryParams.append("ownerid", filters.ownerid);

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_MM_STORE_API_URL
      }/mm-store/city/${encodeURIComponent(filters.city)}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to fetch stores for city: ${filters.city}`
      );
    }

    const stores = await response.json();
    const addressIds = stores.map((store) => store.addressid);
    const addresses = await fetchStoreAddresses(addressIds);

    const storesWithCity = stores.map((store) => ({
      ...store,
      city: addresses[store.addressid]?.city || "N/A",
    }));

    return storesWithCity;
  } catch (error) {
    console.error(`Error fetching stores by city (${city}):`, error);
    throw error;
  }
};

const fetchStoreAddresses = async (addressIds) => {
    const addressPromises = addressIds.map((id) =>
      fetch(`${import.meta.env.VITE_MM_ADDRESS_API_URL}/mm-address/${id}`)
        .then((res) => res.json())
        .catch(() => ({ id, city: "N/A" }))
    );
  
    const addresses = await Promise.all(addressPromises);
    return addresses.reduce((acc, address) => {
      acc[address.id] = address;
      return acc;
    }, {});
  };

export const createStore = async (storeData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_MM_STORE_API_URL}/mm-store/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storeData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create store");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating store:", error);
    throw error;
  }
};

export const updateStore = async (storeId, storeData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_MM_STORE_API_URL}/mm-store/${storeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storeData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update store");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating store:", error);
    throw error;
  }
};

export const fetchStoreDetails = async (storeId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_MM_STORE_API_URL}/mm-store/${storeId}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch store details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching store details:", error);
    throw error;
  }
};

export const deleteStore = async (storeId) => {
    try {
      // First, fetch the store to get the address ID
      const storeResponse = await fetch(`${import.meta.env.VITE_MM_STORE_API_URL}/mm-store/${storeId}`);
      if (!storeResponse.ok) {
        throw new Error("Failed to fetch store details");
      }
      const storeData = await storeResponse.json();
  
      // Delete the address using the address ID from the store
      if (storeData.addressid) {
        await deleteAddress(storeData.addressid);
      }
  
      // Proceed to delete the store after successfully deleting the address
      const response = await fetch(
        `${import.meta.env.VITE_MM_STORE_API_URL}/mm-store/${storeId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData.message || "Failed to delete store");
      }
      return true;
    } catch (error) {
      console.error("Error deleting store:", error);
      throw error;
    }
  };