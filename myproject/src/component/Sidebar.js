import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Sidebar.css"; // Optional: Include CSS for styling

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <h3>Navigation</h3>
        <ul className="sidebar-list">
          <li>
            <Link to="/payment">Payments</Link>
          </li>
          <li>
            <Link to="/order">Orders</Link>
          </li>
          <li>
            <Link to="/customer">Customers</Link>
          </li>
          <li>
            <Link to="/product">Products</Link>
          </li>
          <li>
            <Link to="/supplier">Suppliers</Link>
          </li>
          {/* <li>
            <Link to="/categories">Categories</Link>
          </li> */}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
