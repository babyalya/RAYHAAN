import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const API_URL = "http://localhost:8000/api/";
  const PRODUCT_API_URL = `${API_URL}product/`;
  const CATEGORY_API_URL = `${API_URL}categories/`;

  // Fetch categories and products on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          axios.get(CATEGORY_API_URL),
          axios.get(PRODUCT_API_URL),
        ]);
        setCategories(categoryResponse.data);
        setProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [CATEGORY_API_URL, PRODUCT_API_URL]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product List</h2>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center">Products</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.pro_name}</td>
                  <td>
                    {categories.find((cat) => cat.id === product.category)
                      ?.name || "Unknown"}
                  </td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="text-center">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
