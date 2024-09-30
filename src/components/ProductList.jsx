// src/components/ProductList.jsx

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  fetchInventoryByStoreId,
  fetchInventoryByCity,
  deleteInventoryItem,
} from "../services/inventoryService.js";
import { fetchAddressById } from "../services/addressService.js";
import { useAuth } from "../context/AuthContext.jsx";
import ProductCard from "./ProductCard.jsx";
import "../css/ProductList.css";
import ProductEditForm from "./ProductEditForm.jsx";

const ProductList = ({ storeId }) => {
  const [stock, setStock] = useState([]);
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    description: "",
    brand: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [editingStockId, setEditingStockId] = useState(null);
  const [selectedStockId, setSelectedStockId] = useState(null);

  const loadStock = async () => {
    setIsLoading(true);
    setErrors(null);

    try {
      let fetchedStock = null;
      if (storeId === undefined) {
        //loading from the top menu, display all products from all stores
        const userAddr = await fetchAddressById(user.addressid);
        fetchedStock = await fetchInventoryByCity(userAddr.city, filters);
      } else {
        fetchedStock = await fetchInventoryByStoreId(storeId, filters);
      }
      setStock(fetchedStock);
    } catch (error) {
      setErrors("Failed to load products: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStock();
  }, [storeId, filters, user.addressid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (stockId) => {
    if (
      window.confirm("Tem certeza que deseja deletar este item desta loja?")
    ) {
      try {
        await deleteInventoryItem(stockId);
        alert("Item excluído com sucesso!");
        loadStock();
      } catch (error) {
        alert("Erro ao deletar a item: " + error.message);
      }
    }
  };

  const handleEdit = (stockId) => {
    setEditingStockId(stockId);
  };

  const handleEditSuccess = () => {
    setEditingStockId(null);
    loadStock();
  };

  return (
    <div className="product-list">
      <h2>Lista de Produtos</h2>
      <div className="search-bar">
        <input
          name="name"
          type="text"
          placeholder="Pesquisar por nome..."
          value={filters.name}
          onChange={handleChange}
        />
        <input
          name="category"
          type="text"
          placeholder="Pesquisar por categoria..."
          value={filters.category}
          onChange={handleChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Pesquisar por descrição..."
          value={filters.description}
          onChange={handleChange}
        />
        <input
          name="brand"
          type="text"
          placeholder="Pesquisar por marca..."
          value={filters.brand}
          onChange={handleChange}
        />
      </div>
      {isLoading && <div>Carregando...</div>}
      {errors && <div className="error">{errors}</div>}
      {editingStockId ? (
        <ProductEditForm
          stockId={editingStockId}
          onSuccess={handleEditSuccess}
        />
      ) : (
        <div className="product-grid">
          {stock.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
ProductList.propTypes = {
  storeId: PropTypes.number.isRequired,
};

export default ProductList;
