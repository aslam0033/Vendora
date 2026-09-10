import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Vendors from "./pages/Vendors";
import VendorStore from "./pages/VendorStore";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Main Website Layout */}
          <Route element={<MainLayout />}>

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Products */}
            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            {/* Vendors */}
            <Route
              path="/vendors"
              element={<Vendors />}
            />

            <Route
              path="/vendors/:id"
              element={<VendorStore />}
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* Checkout */}
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            {/* Order Success */}
            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />

            {/* Invalid Routes */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;