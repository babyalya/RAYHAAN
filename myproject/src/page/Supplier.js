import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  const API_URL = "http://127.0.0.1:8000/api/supplier/";

  // Fetch all suppliers
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(API_URL);
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  // Fetch suppliers on mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Supplier Management</h2>
      <div className="row">
        {/* Supplier List */}
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-center">Supplier List</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>{supplier.id}</td>
                      <td>{supplier.supp_name}</td>
                      <td>{supplier.address}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone_number || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {suppliers.length === 0 && (
                <p className="text-center">No suppliers available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
