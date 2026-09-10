import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const { totalItems } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/products");
      setMenuOpen(false);
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(value)}`
    );

    setMenuOpen(false);
  };

  const handleCategory = (category) => {
    navigate(
      `/products?category=${encodeURIComponent(category)}`
    );

    setCategoryOpen(false);
    setMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setCategoryOpen(false);
  };

  return (
    <>
      {/* Promotional Bar */}
      <div className="bg-slate-950 text-white text-center text-xs sm:text-sm py-2 px-4">
        Free delivery on orders above{" "}
        <span className="font-semibold text-indigo-300">
          ₹999
        </span>

        <span className="hidden sm:inline">
          {" "}
          • Shop from trusted vendors across India
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Row */}
          <div className="h-188 flex items-center justify-between gap-4">

            {/* Brand */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-2.5 shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
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
                  className="w-full border border-gray-300 rounded-full py-2.5 pl-5 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition"
                >
                  <FiSearch />
                </button>
              </div>
            </form>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-5">

              {/* Account */}
              <button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition">
                <FiUser className="text-xl" />

                <div className="text-left hidden lg:block">
                  <p className="text-[11px] text-gray-500">
                    Welcome
                  </p>

                  <p className="text-sm font-semibold">
                    My Account
                  </p>
                </div>
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition"
              >
                <div className="relative">
                  <FiShoppingCart className="text-2xl" />

                  {totalItems > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 min-w-5 h-5 px-1 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                      {totalItems > 99
                        ? "99+"
                        : totalItems}
                    </span>
                  )}
                </div>

                <span className="font-medium hidden lg:block">
                  Cart
                </span>
              </Link>

            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-4">

              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="relative"
              >
                <FiShoppingCart className="text-2xl text-slate-800" />

                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 min-w-5 h-5 px-1 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center">
                    {totalItems > 99
                      ? "99+"
                      : totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="text-2xl text-slate-900"
              >
                {menuOpen ? (
                  <FiX />
                ) : (
                  <FiMenu />
                )}
              </button>

            </div>

          </div>

          {/* Desktop Bottom Navigation */}
          <nav className="hidden md:flex items-center justify-between border-t border-gray-100 h-12">

            <div className="flex items-center gap-7 text-sm font-medium">

              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Products
              </Link>

              <Link
                to="/vendors"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Vendors
              </Link>

              {/* Categories */}
              <div className="relative">

                <button
                  onClick={() =>
                    setCategoryOpen(
                      !categoryOpen
                    )
                  }
                  className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
                >
                  Categories

                  <FiChevronDown
                    className={`transition-transform ${
                      categoryOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {categoryOpen && (
                  <div className="absolute top-8 left-0 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">

                    {categories.map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() =>
                            handleCategory(
                              category
                            )
                          }
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
                        >
                          {category}
                        </button>
                      )
                    )}

                  </div>
                )}

              </div>

              <Link
                to="/products"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                New Arrivals
              </Link>

              <Link
                to="/products"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Best Sellers
              </Link>

            </div>

            <Link
              to="/products"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
            >
              Today's Deals 🔥
            </Link>

          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-200 py-5">

              {/* Mobile Search */}
              <form
                onSubmit={handleSearch}
                className="relative mb-5"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search products or vendors..."
                  className="w-full border border-gray-300 rounded-xl py-3 pl-4 pr-12 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center"
                >
                  <FiSearch />
                </button>
              </form>

              {/* Mobile Links */}
              <div className="flex flex-col">

                <Link
                  onClick={closeMobileMenu}
                  to="/"
                  className="py-3 border-b border-gray-100 font-medium text-gray-700 hover:text-indigo-600"
                >
                  Home
                </Link>

                <Link
                  onClick={closeMobileMenu}
                  to="/products"
                  className="py-3 border-b border-gray-100 font-medium text-gray-700 hover:text-indigo-600"
                >
                  Products
                </Link>

                <Link
                  onClick={closeMobileMenu}
                  to="/vendors"
                  className="py-3 border-b border-gray-100 font-medium text-gray-700 hover:text-indigo-600"
                >
                  Vendors
                </Link>

                {/* Mobile Category Toggle */}
                <button
                  onClick={() =>
                    setCategoryOpen(
                      !categoryOpen
                    )
                  }
                  className="py-3 border-b border-gray-100 flex justify-between items-center font-medium text-gray-700"
                >
                  Categories

                  <FiChevronDown
                    className={`transition-transform ${
                      categoryOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {categoryOpen && (
                  <div className="bg-slate-50 rounded-xl my-2 overflow-hidden">

                    {categories.map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() =>
                            handleCategory(
                              category
                            )
                          }
                          className="block w-full text-left px-5 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          {category}
                        </button>
                      )
                    )}

                  </div>
                )}

                <Link
                  onClick={closeMobileMenu}
                  to="/products"
                  className="py-3 border-b border-gray-100 font-medium text-gray-700 hover:text-indigo-600"
                >
                  New Arrivals
                </Link>

                <Link
                  onClick={closeMobileMenu}
                  to="/products"
                  className="py-3 border-b border-gray-100 font-medium text-gray-700 hover:text-indigo-600"
                >
                  Best Sellers
                </Link>

                <Link
                  onClick={closeMobileMenu}
                  to="/products"
                  className="py-3 font-semibold text-orange-600"
                >
                  Today's Deals 🔥
                </Link>

              </div>

              {/* Mobile Account */}
              <button className="mt-5 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition">
                <FiUser />
                My Account
              </button>

            </div>
          )}

        </div>
      </header>
    </>
  );
}

export default Navbar;