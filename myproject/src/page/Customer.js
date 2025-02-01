import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Customer = () => {
  const [customers, setCustomers] = useState([]); // Customers state
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    gender: "M",
    email: "",
  });
  const [error, setError] = useState(null); // Error state
  const API_URL = "http://127.0.0.1:8000/api/customer/";

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please try again later.");
    }
  };

  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(API_URL, {
        customer_name: formData.customerName,
        phone_number: formData.phoneNumber,
        address: formData.address,
        gender: formData.gender,
        email: formData.email,
      });

      alert("Customer added successfully!");
      setCustomers([...customers, response.data]); // Add the new customer to the list

      // Reset form
      setFormData({
        customerName: "",
        phoneNumber: "",
        address: "",
        gender: "M",
        email: "",
      });
    } catch (err) {
      console.error("Error adding customer:", err);
      setError("Failed to add customer. Please try again.");
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Customer Management</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="row">
        {/* Left Column: Add Customer Form */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-center">Add Customer</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    className="form-control"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="form-control"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Customer
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: View Customer List */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-center">Customer List</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.customer_name}</td>
                      <td>{customer.phone_number}</td>
                      <td>{customer.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {customers.length === 0 && (
                <p className="text-center">No customers available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
