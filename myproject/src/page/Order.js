import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Order = () => {
  const [formData, setFormData] = useState({
    orderDate: "",
    // totalPrice: "",
    customer: "",
  });
  const [customers, setCustomers] = useState([]);
  // const [products, setProducts] = useState([]); // Dynamic product list
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8000/api/";

  // Fetch customers and products
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [customersResponse, productsResponse] = await Promise.all([
          axios.get(`${API_URL}customer/`),
          axios.get(`${API_URL}product/`),
        ]);
        setCustomers(customersResponse.data);
        // setProducts(productsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchInitialData();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add an item to the order
  // const handleAddItem = (item) => {
  //   const existingItem = orderItems.find((i) => i.id === item.id);
  //   if (existingItem) {
  //     setOrderItems(
  //       orderItems.map((i) =>
  //         i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
  //       )
  //     );
  //   } else {
  //     setOrderItems([...orderItems, { ...item, quantity: 1 }]);
  //   }
  // };

  // Submit the order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post(`${API_URL}order/`, {
        Order_date: formData.orderDate,
        total_price: formData.totalPrice,
        customer: formData.customer,
        items: orderItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
      });

      alert("Order added successfully!");

      // Reset form and order items
      setFormData({ orderDate: "", totalPrice: "", customer: "" });
      setOrderItems([]);
    } catch (err) {
      console.error("Error submitting order:", err);
      setError("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Order</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {/* Left Column: Add Order Form */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="orderDate" className="form-label">
                    Order Date
                  </label>
                  <input
                    type="date"
                    id="orderDate"
                    className="form-control"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="totalPrice" className="form-label">
                    Total Price
                  </label>
                  <input
                    type="number"
                    id="totalPrice"
                    className="form-control"
                    name="totalPrice"
                    value={formData.totalPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customer" className="form-label">
                    Customer
                  </label>
                  <select
                    id="customer"
                    className="form-control"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.customer_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Add Order
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Products & Order Items */}
        
              {orderItems.length > 0 && (
                <div>
                  <h5 className="mt-4">Order Summary</h5>
                  <ul className="list-group">
                    {orderItems.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {item.productName} (x{item.quantity})
                        <span>${item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
      
  );
};

export default Order;
