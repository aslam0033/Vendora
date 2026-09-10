import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiStar,
  FiArrowRight,
  FiPackage,
  FiUsers,
  FiFilter,
  FiCheckCircle,
} from "react-icons/fi";

import vendors from "../data/vendors";

function Vendors() {
  const categories = [
    "All",
    ...new Set(vendors.map((vendor) => vendor.category)),
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        vendor.name.toLowerCase().includes(searchValue) ||
        vendor.category.toLowerCase().includes(searchValue) ||
        vendor.description.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || vendor.category === category;

      const matchesVerification =
        !verifiedOnly || vendor.verified;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesVerification
      );
    });
  }, [search, category, verifiedOnly]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">

          <div className="max-w-3xl">

            <span className="text-indigo-300 uppercase tracking-wider font-semibold text-sm">
              Trusted Marketplace Sellers
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold mt-3 leading-tight">
              Discover Stores You'll{" "}
              <span className="text-indigo-300">
                Love Shopping From
              </span>
            </h1>

            <p className="mt-5 text-gray-400 leading-7 max-w-2xl">
              Explore trusted vendors from different categories and
              shop quality products from sellers across the Vendora
              marketplace.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mt-8">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendors by name or category..."
                className="w-full bg-white text-slate-900 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-indigo-500/30"
              />

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="-mt-7 relative z-10 bg-white border border-gray-200 rounded-2xl shadow-sm grid grid-cols-2 lg:grid-cols-4">

          <div className="p-6 text-center border-r border-b lg:border-b-0 border-gray-200">

            <p className="text-2xl md:text-3xl font-bold text-slate-900">
              {vendors.length}+
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Featured Vendors
            </p>

          </div>

          <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-gray-200">

            <p className="text-2xl md:text-3xl font-bold text-slate-900">
              5K+
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Marketplace Products
            </p>

          </div>

          <div className="p-6 text-center border-r border-gray-200">

            <p className="text-2xl md:text-3xl font-bold text-slate-900">
              4.8
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Average Rating
            </p>

          </div>

          <div className="p-6 text-center">

            <p className="text-2xl md:text-3xl font-bold text-slate-900">
              10K+
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Happy Customers
            </p>

          </div>

        </div>

      </section>

      {/* Vendors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">

          <div>

            <p className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">
              Explore Vendors
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Marketplace Stores
            </h2>

            <p className="text-gray-500 mt-2">
              {filteredVendors.length}{" "}
              {filteredVendors.length === 1
                ? "vendor"
                : "vendors"}{" "}
              available
            </p>

          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">

            {categories.map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  category === item
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">

          <div className="flex items-center gap-2 text-sm text-gray-600">

            <FiFilter className="text-indigo-600" />

            <span>
              Showing{" "}
              <strong className="text-slate-900">
                {filteredVendors.length}
              </strong>{" "}
              vendor stores
            </span>

          </div>

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) =>
                setVerifiedOnly(e.target.checked)
              }
              className="w-4 h-4 accent-indigo-600"
            />

            <span className="text-sm font-medium text-gray-600">
              Verified Vendors Only
            </span>

          </label>

        </div>

        {/* Vendor Grid */}
        {filteredVendors.length > 0 ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

            {filteredVendors.map((vendor) => (

              <div
                key={vendor.id}
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* Store Banner */}
                <Link
                  to={`/vendors/${vendor.id}`}
                  className="block h-44 relative overflow-hidden bg-gray-100"
                >

                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

                  {vendor.verified && (

                    <span className="absolute top-4 right-4 bg-white text-green-600 shadow-sm px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">

                      <FiCheckCircle />
                      Verified

                    </span>

                  )}

                </Link>

                {/* Details */}
                <div className="px-6 pb-6">

                  <div className="flex justify-between items-end -mt-10 relative z-10">

                    {/* Logo */}
                    <Link to={`/vendors/${vendor.id}`}>

                      <img
                        src={vendor.logo}
                        alt={`${vendor.name} logo`}
                        className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md"
                      />

                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">

                      <FiStar
                        className="text-yellow-400"
                        fill="currentColor"
                      />

                      <span className="font-bold text-slate-900">
                        {vendor.rating}
                      </span>

                      <span className="text-xs text-gray-400">
                        ({vendor.reviews.toLocaleString()})
                      </span>

                    </div>

                  </div>

                  {/* Store Information */}
                  <div className="mt-4">

                    <div className="flex items-center gap-2">

                      <Link to={`/vendors/${vendor.id}`}>

                        <h3 className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition">
                          {vendor.name}
                        </h3>

                      </Link>

                      {vendor.verified && (
                        <FiCheckCircle className="text-blue-500" />
                      )}

                    </div>

                    <span className="inline-block mt-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {vendor.category}
                    </span>

                    <p className="text-sm text-gray-500 leading-6 mt-4 min-h-18">
                      {vendor.description}
                    </p>

                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">

                      <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                        <FiPackage />
                      </div>

                      <div>

                        <p className="font-bold text-slate-900">
                          {vendor.products}
                        </p>

                        <p className="text-xs text-gray-500">
                          Products
                        </p>

                      </div>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">

                      <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                        <FiUsers />
                      </div>

                      <div>

                        <p className="font-bold text-slate-900">
                          {vendor.followers}
                        </p>

                        <p className="text-xs text-gray-500">
                          Followers
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Store Location */}
                  <div className="mt-4 border-t border-gray-100 pt-4">

                    <p className="text-xs text-gray-500">
                      Based in
                    </p>

                    <p className="text-sm font-medium text-slate-700 mt-1">
                      {vendor.location}
                    </p>

                  </div>

                  {/* Button */}
                  <Link
                    to={`/vendors/${vendor.id}`}
                    className="mt-6 w-full flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl py-3 font-semibold transition"
                  >
                    Visit Store
                    <FiArrowRight />
                  </Link>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-3xl py-20 px-5 text-center">

            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              <FiSearch />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-5">
              No vendors found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing the vendor name, category or verification
              filter.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>

      {/* Vendor Benefits */}
      <section className="bg-white border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-indigo-600 uppercase tracking-wider text-sm font-semibold">
              Shop With Confidence
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Why Shop from Vendora Vendors?
            </h2>

            <p className="text-gray-500 leading-7 mt-3">
              Discover sellers from multiple categories while enjoying
              a consistent and reliable marketplace experience.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

            <div className="bg-slate-50 rounded-2xl p-6">

              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="text-xl" />
              </div>

              <h3 className="font-bold text-slate-900 mt-4">
                Trusted Sellers
              </h3>

              <p className="text-sm text-gray-500 leading-6 mt-2">
                Shop from established marketplace vendors.
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-6">

              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <FiPackage className="text-xl" />
              </div>

              <h3 className="font-bold text-slate-900 mt-4">
                Quality Products
              </h3>

              <p className="text-sm text-gray-500 leading-6 mt-2">
                Explore products across multiple categories.
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-6">

              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <FiStar className="text-xl" />
              </div>

              <h3 className="font-bold text-slate-900 mt-4">
                Real Ratings
              </h3>

              <p className="text-sm text-gray-500 leading-6 mt-2">
                Compare sellers using ratings and customer reviews.
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-6">

              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <FiUsers className="text-xl" />
              </div>

              <h3 className="font-bold text-slate-900 mt-4">
                Growing Community
              </h3>

              <p className="text-sm text-gray-500 leading-6 mt-2">
                Connect with stores trusted by marketplace customers.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Become Vendor CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">

          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"></div>

          <div className="absolute right-40 -bottom-28 w-72 h-72 bg-white/5 rounded-full"></div>

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            <div className="max-w-2xl">

              <p className="text-indigo-100 font-semibold">
                Grow your business with Vendora
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Want to Become a Vendor?
              </h2>

              <p className="text-indigo-100 mt-4 leading-7">
                Showcase your products to thousands of customers and
                build your online presence through our marketplace.
              </p>

            </div>

            <button className="bg-white text-indigo-600 hover:bg-slate-100 px-7 py-3.5 rounded-xl font-semibold shrink-0 transition">
              Start Selling
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Vendors;