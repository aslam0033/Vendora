import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiChevronDown,
  FiShoppingCart,
  FiStar,
  FiGrid,
  FiList,
  FiSliders,
  FiCheck,
  FiCheckCircle,
} from "react-icons/fi";

import products from "../data/products";
import { useCart } from "../context/CartContext";

function Products() {
  const { addToCart, isInCart } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const priceRanges = [
    {
      label: "All Prices",
      min: 0,
      max: Infinity,
    },
    {
      label: "Under ₹1,000",
      min: 0,
      max: 1000,
    },
    {
      label: "₹1,000 - ₹3,000",
      min: 1000,
      max: 3000,
    },
    {
      label: "₹3,000 - ₹10,000",
      min: 3000,
      max: 10000,
    },
    {
      label: "Above ₹10,000",
      min: 10000,
      max: Infinity,
    },
  ];

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(
    categories.includes(initialCategory)
      ? initialCategory
      : "All"
  );

  const [priceRange, setPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("popularity");
  const [rating, setRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState("grid");

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "All";

    setSearch(urlSearch);

    if (categories.includes(urlCategory)) {
      setCategory(urlCategory);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  const updateUrlParams = (newSearch, newCategory) => {
    const params = {};

    if (newSearch.trim()) {
      params.search = newSearch.trim();
    }

    if (newCategory !== "All") {
      params.category = newCategory;
    }

    setSearchParams(params);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    updateUrlParams(value, category);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    updateUrlParams(search, value);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const searchValue = search.trim().toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue) ||
          product.vendor.toLowerCase().includes(searchValue) ||
          product.category.toLowerCase().includes(searchValue) ||
          product.subCategory
            ?.toLowerCase()
            .includes(searchValue)
      );
    }

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange.min &&
        product.price <= priceRange.max
    );

    if (rating > 0) {
      result = result.filter(
        (product) => product.rating >= rating
      );
    }

    if (inStockOnly) {
      result = result.filter(
        (product) => product.stockCount > 0
      );
    }

    if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort(
        (a, b) => b.popularity - a.popularity
      );
    }

    return result;
  }, [
    search,
    category,
    priceRange,
    rating,
    inStockOnly,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPriceRange(priceRanges[0]);
    setSortBy("popularity");
    setRating(0);
    setInStockOnly(false);
    setSearchParams({});
  };

  const FilterContent = () => (
    <div>
      {/* Filter Header */}
      <div className="flex justify-between items-center pb-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FiSliders className="text-indigo-600" />

          <h2 className="font-bold text-lg text-slate-900">
            Filters
          </h2>
        </div>

        <button
          onClick={clearFilters}
          className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="py-6 border-b border-gray-200">
        <h3 className="font-semibold text-slate-900 mb-4">
          Product Category
        </h3>

        <div className="space-y-3">
          {categories.map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() =>
                  handleCategoryChange(item)
                }
                className="accent-indigo-600 w-4 h-4"
              />

              <span
                className={`text-sm transition ${
                  category === item
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-600 group-hover:text-slate-900"
                }`}
              >
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="py-6 border-b border-gray-200">
        <h3 className="font-semibold text-slate-900 mb-4">
          Price Range
        </h3>

        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="price"
                checked={priceRange.label === range.label}
                onChange={() =>
                  setPriceRange(range)
                }
                className="accent-indigo-600 w-4 h-4"
              />

              <span className="text-sm text-gray-600">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="py-6 border-b border-gray-200">
        <h3 className="font-semibold text-slate-900 mb-4">
          Customer Rating
        </h3>

        <div className="space-y-3">
          {[4, 3, 2].map((value) => (
            <button
              key={value}
              onClick={() =>
                setRating(
                  rating === value ? 0 : value
                )
              }
              className="flex items-center gap-2 w-full"
            >
              <div
                className={`w-4 h-4 border rounded flex items-center justify-center ${
                  rating === value
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "border-gray-300"
                }`}
              >
                {rating === value && (
                  <FiCheck size={12} />
                )}
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={14}
                    className={
                      star <= value
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                    fill={
                      star <= value
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-gray-500">
                & Up
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="pt-6">
        <h3 className="font-semibold text-slate-900 mb-4">
          Availability
        </h3>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) =>
              setInStockOnly(e.target.checked)
            }
            className="accent-indigo-600 w-4 h-4"
          />

          <span className="text-sm text-gray-600">
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-indigo-300 text-sm font-semibold uppercase tracking-wider">
            Vendora Marketplace
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
            Discover Products You'll Love
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl leading-7">
            Browse quality products from trusted vendors
            across multiple categories and find the perfect
            deal for you.
          </p>

          <div className="relative max-w-2xl mt-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearchChange(e.target.value)
              }
              placeholder="Search products, vendors or categories..."
              className="w-full bg-white text-slate-900 rounded-xl py-4 pl-12 pr-12 outline-none focus:ring-4 focus:ring-indigo-500/30"
            />

            {search && (
              <button
                onClick={() =>
                  handleSearchChange("")
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Active Category */}
        {category !== "All" && (
          <div className="mb-5 flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Category:
            </span>

            <button
              onClick={() =>
                handleCategoryChange("All")
              }
              className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full px-4 py-2 text-sm font-semibold"
            >
              {category}
              <FiX />
            </button>
          </div>
        )}

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-5">
          <button
            onClick={() =>
              setFilterOpen(true)
            }
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white rounded-xl py-3 font-semibold text-slate-800"
          >
            <FiFilter />
            Show Filters
          </button>
        </div>

        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-36">
              <FilterContent />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>
                <p className="font-semibold text-slate-900">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "Product"
                    : "Products"}{" "}
                  Found
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Products from trusted marketplace vendors.
                </p>
              </div>

              <div className="flex items-center gap-3">

                {/* Grid/List */}
                <div className="hidden sm:flex border border-gray-200 rounded-lg overflow-hidden">

                  <button
                    onClick={() => setView("grid")}
                    className={`p-2.5 ${
                      view === "grid"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    <FiGrid />
                  </button>

                  <button
                    onClick={() => setView("list")}
                    className={`p-2.5 ${
                      view === "list"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    <FiList />
                  </button>

                </div>

                {/* Sort */}
                <div className="relative flex-1 sm:flex-none">

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value)
                    }
                    className="appearance-none w-full sm:w-48 border border-gray-300 bg-white rounded-lg px-4 py-2.5 pr-9 outline-none focus:border-indigo-500 text-sm"
                  >
                    <option value="popularity">
                      Most Popular
                    </option>

                    <option value="rating">
                      Highest Rated
                    </option>

                    <option value="priceLow">
                      Price: Low to High
                    </option>

                    <option value="priceHigh">
                      Price: High to Low
                    </option>
                  </select>

                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />

                </div>

              </div>

            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-5"
                }
              >
                {filteredProducts.map((product) =>
                  view === "grid" ? (

                    /* Grid Card */
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >

                      <Link
                        to={`/products/${product.id}`}
                        className="block h-60 overflow-hidden bg-gray-100 relative"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-white shadow rounded-full px-3 py-1.5 text-xs font-semibold">
                            {product.badge}
                          </span>
                        )}

                        {product.stockCount === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white text-slate-900 font-semibold px-4 py-2 rounded-full text-sm">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </Link>

                      <div className="p-5">

                        <div className="flex justify-between items-center gap-3">
                          <span className="text-xs font-semibold text-indigo-600">
                            {product.category}
                          </span>

                          <span
                            className={`text-xs font-medium ${
                              product.stockCount === 0
                                ? "text-red-500"
                                : product.stockCount <= 5
                                ? "text-orange-500"
                                : "text-green-600"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </div>

                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-bold text-slate-900 mt-3 leading-6 min-h-12 hover:text-indigo-600 transition">
                            {product.name}
                          </h3>
                        </Link>

                        <Link
                          to={`/vendors/${product.vendorId}`}
                          className="text-sm text-gray-500 mt-2 inline-block"
                        >
                          Sold by{" "}
                          <span className="font-medium text-slate-700 hover:text-indigo-600">
                            {product.vendor}
                          </span>
                        </Link>

                        <div className="flex items-center gap-2 mt-3">
                          <FiStar
                            className="text-yellow-400"
                            fill="currentColor"
                          />

                          <span className="font-semibold text-sm">
                            {product.rating}
                          </span>

                          <span className="text-xs text-gray-400">
                            ({product.reviews} reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-xl font-bold text-slate-900">
                            ₹{product.price.toLocaleString()}
                          </span>

                          <span className="text-sm line-through text-gray-400">
                            ₹{product.oldPrice.toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            addToCart(product)
                          }
                          disabled={product.stockCount === 0}
                          className={`mt-5 w-full py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition ${
                            product.stockCount === 0
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : isInCart(product.id)
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-slate-900 text-white hover:bg-indigo-600"
                          }`}
                        >
                          {product.stockCount === 0 ? (
                            <>
                              <FiX />
                              Out of Stock
                            </>
                          ) : isInCart(product.id) ? (
                            <>
                              <FiCheckCircle />
                              Add Another
                            </>
                          ) : (
                            <>
                              <FiShoppingCart />
                              Add to Cart
                            </>
                          )}
                        </button>

                      </div>

                    </div>
                  ) : (

                    /* List Card */
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row"
                    >
                      <Link
                        to={`/products/${product.id}`}
                        className="sm:w-60 h-56 sm:h-auto shrink-0 overflow-hidden relative bg-gray-100"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />

                        {product.stockCount === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </Link>

                      <div className="p-5 flex-1">

                        <div className="flex justify-between gap-4">
                          <span className="text-xs font-semibold text-indigo-600">
                            {product.category}
                          </span>

                          <span
                            className={`text-xs font-medium ${
                              product.stockCount === 0
                                ? "text-red-500"
                                : product.stockCount <= 5
                                ? "text-orange-500"
                                : "text-green-600"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </div>

                        <Link to={`/products/${product.id}`}>
                          <h3 className="text-xl font-bold text-slate-900 mt-2 hover:text-indigo-600">
                            {product.name}
                          </h3>
                        </Link>

                        <Link
                          to={`/vendors/${product.vendorId}`}
                          className="text-sm text-gray-500 mt-2 inline-block"
                        >
                          Sold by{" "}
                          <span className="font-medium hover:text-indigo-600">
                            {product.vendor}
                          </span>
                        </Link>

                        <div className="flex items-center gap-2 mt-3">
                          <FiStar
                            className="text-yellow-400"
                            fill="currentColor"
                          />

                          <span className="font-semibold text-sm">
                            {product.rating}
                          </span>

                          <span className="text-xs text-gray-400">
                            ({product.reviews} reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                          <span className="text-2xl font-bold">
                            ₹{product.price.toLocaleString()}
                          </span>

                          <span className="line-through text-gray-400">
                            ₹{product.oldPrice.toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            addToCart(product)
                          }
                          disabled={product.stockCount === 0}
                          className={`mt-5 px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold ${
                            product.stockCount === 0
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : isInCart(product.id)
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-slate-900 text-white hover:bg-indigo-600"
                          }`}
                        >
                          {product.stockCount === 0 ? (
                            <>
                              <FiX />
                              Out of Stock
                            </>
                          ) : isInCart(product.id) ? (
                            <>
                              <FiCheckCircle />
                              Add Another
                            </>
                          ) : (
                            <>
                              <FiShoppingCart />
                              Add to Cart
                            </>
                          )}
                        </button>

                      </div>

                    </div>
                  )
                )}
              </div>
            ) : (

              /* Empty Results */
              <div className="bg-white rounded-2xl border border-gray-200 py-20 px-5 text-center">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                  <FiSearch />
                </div>

                <h2 className="text-xl font-bold text-slate-900 mt-5">
                  No products found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try changing your search or filter options.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Clear Filters
                </button>
              </div>

            )}

          </div>

        </div>

      </section>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">

          <div
            onClick={() =>
              setFilterOpen(false)
            }
            className="absolute inset-0 bg-black/50"
          ></div>

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white overflow-y-auto p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Product Filters
              </h2>

              <button
                onClick={() =>
                  setFilterOpen(false)
                }
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <FilterContent />

            <button
              onClick={() =>
                setFilterOpen(false)
              }
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
            >
              Show {filteredProducts.length} Products
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Products;