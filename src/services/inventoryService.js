// src/services/productService.js

const baseURL = import.meta.env.VITE_MM_INVENTORY_API_URL;

export const createInventoryItem = async (inventoryData) => {
    try {
        const response = await fetch(`${baseURL}/productitems`, {
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

export const fetchInventoryByStore = async (storeId) => {
    try {
        const response = await fetch(`${baseURL}/productitems/store/${storeId}`);
        if (!response.ok) {
            throw new Error('Error fetching inventory by store');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching inventory by store:', error);
        throw error;
    }
};
