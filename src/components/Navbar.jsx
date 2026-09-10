import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value) {
      navigate(
        `/products?search=${encodeURIComponent(value)}`
      );
    } else {
      navigate("/products");
    }

    setSearch("");
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top Offer Bar */}
      <div className="w-full bg-slate-950 text-white text-center text-xs sm:text-sm py-2">
        Free delivery on orders above ₹999 • Shop from trusted vendors
        across India
      </div>

      {/* Main Header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Row */}
          <div className="h-[72px] flex items-center justify-between gap-6">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
                V
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none">
                  Vendora
                </h1>

                <p className="text-[10px] text-gray-500 mt-1 hidden sm:block">
                  Shop. Discover. Connect.
                </p>
              </div>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="hidden md:block flex-1 max-w-xl"
            >
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products, brands and vendors..."
                  className="w-full h-11 border border-gray-300 rounded-full pl-5 pr-12 outline-none focus:border-indigo-500"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center"
                >
                  <FiSearch />
                </button>
              </div>
            </form>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6 shrink-0">

              <div className="flex items-center gap-2">
                <FiUser className="text-xl" />

                <div>
                  <p className="text-[10px] text-gray-500">
                    Welcome
                  </p>

                  <p className="text-sm font-semibold">
                    My Account
                  </p>
                </div>
              </div>

              <Link
                to="/cart"
                className="flex items-center gap-2"
              >
                <div className="relative">

                  <FiShoppingCart className="text-2xl" />

                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}

                </div>

                <span className="font-semibold">
                  Cart
                </span>
              </Link>

            </div>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center gap-4">

              <Link
                to="/cart"
                className="relative"
              >
                <FiShoppingCart className="text-2xl" />

                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="text-2xl"
              >
                {menuOpen ? <FiX /> : <FiMenu />}
              </button>

            </div>

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex h-12 items-center justify-between border-t border-gray-100">

            <div className="flex items-center gap-7 text-sm font-medium">

              <Link
                to="/"
                className="hover:text-indigo-600"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="hover:text-indigo-600"
              >
                Products
              </Link>

              <Link
                to="/vendors"
                className="hover:text-indigo-600"
              >
                Vendors
              </Link>

              <Link
                to="/products"
                className="hover:text-indigo-600"
              >
                Categories
              </Link>

              <Link
                to="/products"
                className="hover:text-indigo-600"
              >
                New Arrivals
              </Link>

              <Link
                to="/products?sort=rating"
                className="hover:text-indigo-600"
              >
                Best Sellers
              </Link>

            </div>

            <Link
              to="/products"
              className="text-orange-600 font-semibold"
            >
              Today's Deals 🔥
            </Link>

          </nav>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">

              <form
                onSubmit={handleSearch}
                className="relative mb-4"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-xl py-3 pl-4 pr-12 outline-none"
                />

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center"
                >
                  <FiSearch />
                </button>
              </form>

              <div className="flex flex-col">

                <Link
                  to="/"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="py-3 border-b border-gray-100"
                >
                  Home
                </Link>

                <Link
                  to="/products"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="py-3 border-b border-gray-100"
                >
                  Products
                </Link>

                <Link
                  to="/vendors"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="py-3"
                >
                  Vendors
                </Link>

              </div>

            </div>
          )}

        </div>
      </header>
    </>
  );
}

export default Navbar;