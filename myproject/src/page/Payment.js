import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Payment = () => {
  const [formData, setFormData] = useState({
    paymentDate: "",
    amount: "",
    paymentMethod: "",
    order: "",
  });
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8000/api/";

  // Fetch orders and payments
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [ordersResponse, paymentsResponse] = await Promise.all([
          axios.get(`${API_URL}order/`),
          axios.get(`${API_URL}payment/`),
        ]);
        setOrders(ordersResponse.data);
        setPayments(paymentsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(`${API_URL}payment/`, {
        payment_date: formData.paymentDate,
        amount: formData.amount,
        payment_method: formData.paymentMethod,
        order: formData.order,
      });

      alert("Payment added successfully!");

      // Reset form
      setFormData({
        paymentDate: "",
        amount: "",
        paymentMethod: "",
        order: "",
      });

      // Refresh payment data
      const updatedPayments = await axios.get(`${API_URL}payment/`);
      setPayments(updatedPayments.data);
    } catch (err) {
      console.error("Error adding payment:", err);
      setError("Failed to add payment. Please check your input and try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Management</h2>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {/* Form Section */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title">Add Payment</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="paymentDate" className="form-label">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    id="paymentDate"
                    className="form-control"
                    name="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    id="paymentMethod"
                    className="form-control"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="order" className="form-label">
                    Order
                  </label>
                  <select
                    id="order"
                    className="form-control"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Order</option>
                    {orders.map((order) => (
                      <option key={order.id} value={order.id}>
                        Order #{order.id}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Payment
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Payments List */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title">Payments</h4>
              {payments.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Payment Date</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.payment_date}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.payment_method}</td>
                        <td>Order #{payment.order}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">No payments found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
