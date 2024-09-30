// src/components/ProductCard.jsx

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  fetchProductById,
  fetchCategoryById,
} from "../services/productService"; // Make sure these functions are correctly imported

const ProductCard = ({ item, onEdit, onDelete }) => {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});

  const loadProduct = async () => {
    try {
      const fetchedProduct = await fetchProductById(item.productid);
      setProduct(fetchedProduct);
      const fetchedCategory = await fetchCategoryById(
        fetchedProduct.categoryid
      );
      setCategory(fetchedCategory);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [item.productid]);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Categoria: {category.name}</p>
      <p>Marca: {product.brand}</p>
      <p>Preço: R${item.price}</p>
      <p>Em estoque: {item.stock}</p>
      {product.imageurl && (
        <div
          style={{
            backgroundImage: `url(${product.imageurl})`,
            height: "200px",
            backgroundSize: "cover",
          }}
        ></div>
      )}
      <div className="product-actions">
        {onEdit && <button onClick={() => onEdit(item.id)}>Editar</button>}
        {onDelete && (
          <button onClick={() => onDelete(item.id)}>Deletar</button>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    productid: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProductCard;
