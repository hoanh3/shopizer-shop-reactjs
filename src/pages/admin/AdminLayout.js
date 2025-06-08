import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const AdminLayout = () => {
  const { path, url } = useRouteMatch();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px",
        backgroundColor: "#2d3436",
        color: "#fff",
        padding: "20px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ color: "#fff" }}>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to={`${url}`} style={navLink}>Dashboard</Link></li>
            <li><Link to={`${url}/users`} style={navLink}>Users</Link></li>
            <li><Link to={`${url}/products`} style={navLink}>Products</Link></li>
            <li><Link to={`${url}/categories`} style={navLink}>Users</Link></li>
            <li><Link to={`${url}/customers`} style={navLink}>Users</Link></li>
            <li><Link to={`${url}/stores`} style={navLink}>Users</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f5f6fa" }}>
        <Switch>
          <Route exact path={path} component={Dashboard} />
        </Switch>
      </main>
    </div>
  );
};

const navLink = {
  display: "block",
  padding: "10px 0",
  color: "#dfe6e9",
  textDecoration: "none"
};

export default AdminLayout;
