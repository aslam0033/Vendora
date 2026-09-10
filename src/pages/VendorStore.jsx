import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiChevronRight,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiSearch,
  FiShoppingCart,
  FiStar,
  FiUsers,
  FiX,
} from "react-icons/fi";

import vendors from "../data/vendors";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function VendorStore() {
  const { id } = useParams();

  const {
    addToCart,
    isInCart,
  } = useCart();

  const vendor = vendors.find(
    (item) => item.id === Number(id)
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [followed, setFollowed] = useState(false);

  if (!vendor) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 max-w-lg w-full text-center">

          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <FiPackage className="text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-6">
            Vendor Not Found
          </h1>

          <p className="text-gray-500 leading-7 mt-3">
            The vendor store you're looking for doesn't exist or is
            currently unavailable.
          </p>

          <Link
            to="/vendors"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-semibold mt-7"
          >
            <FiArrowLeft />
            Explore Vendors
          </Link>

        </div>
      </div>
    );
  }

  const storeProducts = products.filter(
    (product) => product.vendorId === vendor.id
  );

  const categories = [
    "All",
    ...new Set(
      storeProducts.map(
        (product) =>
          product.subCategory || product.category
      )
    ),
  ];

  const filteredProducts = useMemo(() => {
    return storeProducts.filter((product) => {
      const searchValue = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchValue) ||
        product.category
          .toLowerCase()
          .includes(searchValue) ||
        product.subCategory
          ?.toLowerCase()
          .includes(searchValue);

      const currentCategory =
        product.subCategory || product.category;

      const matchesCategory =
        category === "All" ||
        currentCategory === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category, storeProducts]);

  const storeReviews = [
    {
      id: 1,
      name: "Aman Verma",
      rating: 5,
      date: "21 Aug 2026",
      comment:
        "Excellent seller. The product arrived on time and matched the description perfectly.",
    },
    {
      id: 2,
      name: "Priya Kulkarni",
      rating: 5,
      date: "14 Aug 2026",
      comment:
        "Very good experience with this store. Packaging was neat and customer support responded quickly.",
    },
    {
      id: 3,
      name: "Rohan Patil",
      rating: 4,
      date: "7 Aug 2026",
      comment:
        "Good quality products and fair prices. Overall, I am satisfied with the purchase.",
    },
  ];

  const clearStoreFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">

            <Link
              to="/"
              className="hover:text-indigo-600"
            >
              Home
            </Link>

            <FiChevronRight />

            <Link
              to="/vendors"
              className="hover:text-indigo-600"
            >
              Vendors
            </Link>

            <FiChevronRight />

            <span className="font-medium text-slate-800">
              {vendor.name}
            </span>

          </div>

        </div>

      </div>

      {/* Vendor Banner */}
      <section className="bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">

          <Link
            to="/vendors"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 mb-6"
          >
            <FiArrowLeft />
            Back to Vendors
          </Link>

          <div className="relative h-56 md:h-80 overflow-hidden rounded-3xl">

            <img
              src={vendor.banner}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>

            <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 flex flex-wrap items-end justify-between gap-3">

              <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 rounded-full text-sm font-semibold">
                {vendor.category}
              </span>

              {vendor.verified && (
                <span className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <FiCheckCircle />
                  Verified Vendor
                </span>
              )}

            </div>

          </div>

          {/* Vendor Profile */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2 md:px-7 pb-8">

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              <img
                src={vendor.logo}
                alt={`${vendor.name} logo`}
                className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-xl -mt-10 relative z-10"
              />

              <div className="mt-1">

                <div className="flex items-center gap-2 flex-wrap">

                  <h1 className="text-3xl font-bold text-slate-900">
                    {vendor.name}
                  </h1>

                  {vendor.verified && (
                    <FiCheckCircle className="text-blue-500 text-xl" />
                  )}

                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2">

                  <div className="flex items-center gap-1">

                    <FiStar
                      className="text-yellow-400"
                      fill="currentColor"
                    />

                    <span className="font-bold">
                      {vendor.rating}
                    </span>

                    <span className="text-sm text-gray-500">
                      ({vendor.reviews.toLocaleString()} reviews)
                    </span>

                  </div>

                  <span className="text-sm text-gray-500">
                    Member since {vendor.joined}
                  </span>

                </div>

              </div>

            </div>

            <button
              onClick={() => setFollowed(!followed)}
              className={`px-7 py-3 rounded-xl font-semibold transition ${
                followed
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {followed
                ? "Following Store"
                : "Follow Store"}
            </button>

          </div>

        </div>

      </section>

      {/* Store Statistics */}
      <section className="border-y border-gray-200 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="flex items-center gap-3 p-3">

              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FiPackage />
              </div>

              <div>
                <p className="font-bold text-lg">
                  {vendor.products}
                </p>

                <p className="text-xs text-gray-500">
                  Total Products
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3 p-3">

              <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
                <FiStar />
              </div>

              <div>
                <p className="font-bold text-lg">
                  {vendor.rating}
                </p>

                <p className="text-xs text-gray-500">
                  Store Rating
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3 p-3">

              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <FiUsers />
              </div>

              <div>
                <p className="font-bold text-lg">
                  {vendor.followers}
                </p>

                <p className="text-xs text-gray-500">
                  Followers
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3 p-3">

              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FiCheckCircle />
              </div>

              <div>
                <p className="font-bold text-lg">
                  {vendor.verified ? "Verified" : "Active"}
                </p>

                <p className="text-xs text-gray-500">
                  Seller Status
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* About + Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid lg:grid-cols-3 gap-7">

          {/* About */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

            <p className="text-indigo-600 uppercase tracking-wider text-sm font-semibold">
              About Seller
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              About {vendor.name}
            </h2>

            <p className="text-gray-600 leading-7 mt-4">
              {vendor.description}
            </p>

            <p className="text-gray-600 leading-7 mt-3">
              This store focuses on quality products, transparent
              pricing, responsive customer service and dependable order
              fulfilment through the Vendora marketplace.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-7">

              <div className="bg-slate-50 rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Store Category
                </p>

                <p className="font-semibold mt-1">
                  {vendor.category}
                </p>

              </div>

              <div className="bg-slate-50 rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Marketplace Since
                </p>

                <p className="font-semibold mt-1">
                  {vendor.joined}
                </p>

              </div>

              <div className="bg-slate-50 rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Customer Reviews
                </p>

                <p className="font-semibold mt-1">
                  {vendor.reviews.toLocaleString()}+
                </p>

              </div>

            </div>

          </div>

          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <h2 className="text-xl font-bold text-slate-900">
              Store Information
            </h2>

            <div className="space-y-5 mt-6">

              <div className="flex items-start gap-3">

                <FiMapPin className="text-indigo-600 mt-1 shrink-0" />

                <div>
                  <p className="text-xs text-gray-500">
                    Location
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {vendor.location}
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <FiPhone className="text-indigo-600 mt-1 shrink-0" />

                <div>
                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {vendor.phone}
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <FiMail className="text-indigo-600 mt-1 shrink-0" />

                <div>
                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="text-sm font-medium mt-1 break-all">
                    {vendor.email}
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <FiGlobe className="text-indigo-600 mt-1 shrink-0" />

                <div>
                  <p className="text-xs text-gray-500">
                    Website
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {vendor.website}
                  </p>
                </div>

              </div>

            </div>

            <a
              href={`mailto:${vendor.email}`}
              className="w-full mt-7 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl py-3 font-semibold transition flex items-center justify-center gap-2"
            >
              <FiMail />
              Contact Vendor
            </a>

          </div>

        </div>

      </section>

      {/* Store Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7">

          <div>

            <p className="text-indigo-600 uppercase tracking-wider text-sm font-semibold">
              Store Collection
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Products from {vendor.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              currently shown.
            </p>

          </div>

          {/* Store Search */}
          <div className="relative w-full md:w-80">

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search this store..."
              className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() =>
                setCategory(item)
              }
              className={`px-4 py-2.5 rounded-xl text-sm font-medium shrink-0 transition ${
                category === item
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        {filteredProducts.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredProducts.map((product) => {
              const discount = Math.round(
                ((product.oldPrice -
                  product.price) /
                  product.oldPrice) *
                  100
              );

              return (
                <div
                  key={product.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >

                  {/* Product Image */}
                  <Link
                    to={`/products/${product.id}`}
                    className="block h-56 relative overflow-hidden bg-gray-100"
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {product.oldPrice >
                      product.price && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                        {discount}% OFF
                      </span>
                    )}

                    {product.stockCount === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white text-slate-900 font-semibold rounded-full px-4 py-2 text-sm">
                          Out of Stock
                        </span>
                      </div>
                    )}

                  </Link>

                  {/* Product Information */}
                  <div className="p-5">

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-xs font-semibold text-indigo-600">
                        {product.subCategory ||
                          product.category}
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

                    <Link
                      to={`/products/${product.id}`}
                    >
                      <h3 className="font-bold text-slate-900 mt-3 leading-6 min-h-12 hover:text-indigo-600 transition">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-3">

                      <FiStar
                        className="text-yellow-400"
                        fill="currentColor"
                      />

                      <span className="text-sm font-semibold">
                        {product.rating}
                      </span>

                      <span className="text-xs text-gray-400">
                        ({product.reviews})
                      </span>

                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-4">

                      <span className="text-xl font-bold text-slate-900">
                        ₹
                        {product.price.toLocaleString()}
                      </span>

                      <span className="text-sm text-gray-400 line-through">
                        ₹
                        {product.oldPrice.toLocaleString()}
                      </span>

                    </div>

                    {/* Cart */}
                    <button
                      onClick={() =>
                        addToCart(product)
                      }
                      disabled={
                        product.stockCount === 0
                      }
                      className={`w-full mt-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                        product.stockCount === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : isInCart(
                              product.id
                            )
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-slate-900 hover:bg-indigo-600 text-white"
                      }`}
                    >
                      {product.stockCount ===
                      0 ? (
                        <>
                          <FiX />
                          Out of Stock
                        </>
                      ) : isInCart(
                          product.id
                        ) ? (
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
              );
            })}

          </div>

        ) : (

          /* Empty Products */
          <div className="bg-white border border-gray-200 rounded-2xl py-16 px-5 text-center">

            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <FiSearch className="text-2xl" />
            </div>

            <h3 className="text-xl font-bold mt-5">
              No products found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search term or product category.
            </p>

            <button
              onClick={clearStoreFilters}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>

      {/* Reviews */}
      <section className="bg-white border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <div className="flex flex-col md:flex-row justify-between md:items-end gap-5">

            <div>

              <p className="text-indigo-600 uppercase tracking-wider font-semibold text-sm">
                Customer Experience
              </p>

              <h2 className="text-3xl font-bold mt-2">
                Vendor Ratings & Reviews
              </h2>

            </div>

            <div className="flex items-center gap-3">

              <span className="text-4xl font-bold">
                {vendor.rating}
              </span>

              <div>

                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FiStar
                        key={star}
                        fill="currentColor"
                      />
                    )
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {vendor.reviews.toLocaleString()} reviews
                </p>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-9">

            {storeReviews.map((review) => (

              <div
                key={review.id}
                className="border border-gray-200 rounded-2xl p-6"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-slate-900">
                      {review.name}
                    </h3>

                    <p className="text-xs text-green-600 mt-1">
                      Verified Customer
                    </p>

                  </div>

                  <p className="text-xs text-gray-400">
                    {review.date}
                  </p>

                </div>

                <div className="flex gap-1 mt-4">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FiStar
                        key={star}
                        className={
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        fill={
                          star <= review.rating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    )
                  )}

                </div>

                <p className="text-sm text-gray-600 mt-4 leading-6">
                  {review.comment}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="bg-slate-950 text-white rounded-3xl px-6 md:px-10 py-9 flex flex-col md:flex-row md:items-center justify-between gap-7">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold">
              Discover more trusted Vendora sellers
            </h2>

            <p className="text-gray-400 mt-2">
              Explore stores across electronics, fashion, home,
              sports, beauty and more.
            </p>

          </div>

          <Link
            to="/vendors"
            className="bg-white text-slate-900 hover:bg-indigo-50 px-6 py-3 rounded-xl font-semibold text-center shrink-0"
          >
            Explore Vendors
          </Link>

        </div>

      </section>

    </div>
  );
}

export default VendorStore;