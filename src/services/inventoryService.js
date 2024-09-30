// src/services/inventoryService.js

const baseURL = `${import.meta.env.VITE_MM_INVENTORY_API_URL}/mm-inventory`;

// Helper function to construct query parameters based on filters
const constructQueryParams = (filters) => {
    const queryParams = new URLSearchParams();
    if (filters.name) queryParams.append("name", filters.name);
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.description) queryParams.append("description", filters.description);
    if (filters.brand) queryParams.append("brand", filters.brand);
    return queryParams;
};

// Fetch all inventory items with optional filters
export const fetchInventoryItems = async (filters = {}) => {
    const queryParams = constructQueryParams(filters);
    try {
        const response = await fetch(`${baseURL}/?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to fetch inventory items');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        throw error;
    }
};

// Fetch inventory items by store ID with optional filters
export const fetchInventoryByStoreId = async (storeId, filters = {}) => {
    const queryParams = constructQueryParams(filters);
    try {
        const response = await fetch(`${baseURL}/store/${storeId}?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch inventory items for store ID ${storeId}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching inventory for store ID ${storeId}:`, error);
        throw error;
    }
};

// Fetch inventory items by city ID with optional filters
export const fetchInventoryByCity = async (city, filters = {}) => {
    const queryParams = constructQueryParams(filters);
    try {
        const response = await fetch(`${baseURL}/city/${city}?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch inventory items for city ${city}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching inventory for city ID ${city}:`, error);
        throw error;
    }
};

// Fetch a single inventory item by ID
export const fetchInventoryItemById = async (id) => {
    try {
        const response = await fetch(`${baseURL}/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch inventory item with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching inventory item:', error);
        throw error;
    }
};

// Create a new inventory item
export const createInventoryItem = async (inventoryData) => {
    try {
        const response = await fetch(`${baseURL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inventoryData)
        });
        if (!response.ok) {
            throw new Error('Error creating inventory item');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating inventory item:', error);
        throw error;
    }
};

// Update an inventory item
export const updateInventoryItem = async (id, inventoryData) => {
    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inventoryData)
        });
        if (!response.ok) {
            throw new Error(`Failed to update inventory item with ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating inventory item:', error);
        throw error;
    }
};

// Delete an inventory item
export const deleteInventoryItem = async (id) => {
    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Failed to delete inventory item with ID ${id}`);
        }
        return true;  // Return true on successful deletion
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        throw error;
    }
};
