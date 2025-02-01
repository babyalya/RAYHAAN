import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Payment from "./page/Payment";
import Order from "./page/Order"; // Replace with your actual Orders form
import Product from "./page/Product"; // Replace with your actual Products form
import Supplier from "./page/Supplier"; // Replace with your actual Suppliers form
import Categories from "./page/Categories"; // Replace with your actual Categories form
import Customer from "./page/Customer"; // Replace with your actual Customer form

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
          <Routes>
            
              <Route path="/payment" element={<Payment />} />
              <Route path="/order" element={<Order />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/product" element={<Product />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/categories" element={<Categories />} />
       
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
