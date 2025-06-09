import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { productsData } from "./data/products";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({ category: "", price: [0, 3000], sort: "", search: "" });

  // Filter and sort products based on filters
  const filteredProducts = productsData
    .filter(p => (!filters.category || p.category === filters.category))
    .filter(p => p.price >= filters.price[0] && p.price <= filters.price[1])
    .filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()))
    .sort((a, b) => {
      if (filters.sort === "price-asc") return a.price - b.price;
      if (filters.sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <Router>
      <CssBaseline />
      {user && <Navbar cart={cart} user={user} />}
      <Box sx={{ display: "flex" }}>
        {user && <Sidebar filters={filters} setFilters={setFilters} />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <ProductList
                    products={filteredProducts}
                    cart={cart}
                    setCart={setCart}
                    filters={filters}
                    setFilters={setFilters}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login setUser={setUser} />
                )
              }
            />
            <Route
              path="/product/:id"
              element={
                user ? (
                  <ProductDetail products={productsData} cart={cart} setCart={setCart} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/checkout"
              element={
                user ? (
                  <Checkout cart={cart} setCart={setCart} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
