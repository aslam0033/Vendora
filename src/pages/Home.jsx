import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiRefreshCcw,
  FiHeadphones,
  FiStar,
  FiCheckCircle,
} from "react-icons/fi";

import {
  FaLaptop,
  FaTshirt,
  FaCouch,
  FaBasketballBall,
  FaSpa,
  FaMobileAlt,
} from "react-icons/fa";

import products from "../data/products";
import vendors from "../data/vendors";
import { useCart } from "../context/CartContext";

function Home() {
  const {
    addToCart,
    isInCart,
  } = useCart();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      icon: <FaLaptop />,
      items: "240+ Products",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      name: "Fashion",
      icon: <FaTshirt />,
      items: "320+ Products",
      bg: "bg-pink-50",
      iconBg: "bg-pink-100 text-pink-600",
    },
    {
      id: 3,
      name: "Home & Living",
      icon: <FaCouch />,
      items: "180+ Products",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100 text-orange-600",
    },
    {
      id: 4,
      name: "Sports",
      icon: <FaBasketballBall />,
      items: "150+ Products",
      bg: "bg-green-50",
      iconBg: "bg-green-100 text-green-600",
    },
    {
      id: 5,
      name: "Beauty",
      icon: <FaSpa />,
      items: "210+ Products",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      id: 6,
      name: "Mobiles",
      icon: <FaMobileAlt />,
      items: "130+ Products",
      bg: "bg-cyan-50",
      iconBg: "bg-cyan-100 text-cyan-600",
    },
  ];

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  const topVendors = [...vendors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const benefits = [
    {
      icon: <FiTruck />,
      title: "Fast Delivery",
      text: "Quick and reliable delivery across India.",
    },
    {
      icon: <FiShield />,
      title: "Secure Payments",
      text: "Your payments are safe and protected.",
    },
    {
      icon: <FiRefreshCcw />,
      title: "Easy Returns",
      text: "Simple and hassle-free return process.",
    },
    {
      icon: <FiHeadphones />,
      title: "24/7 Support",
      text: "We're always here whenever you need help.",
    },
  ];

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-indigo-800 text-white">

        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">

                <span className="w-2 h-2 bg-green-400 rounded-full"></span>

                Shop from trusted marketplace vendors

              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">

                Everything You Love,

                <span className="block text-indigo-300">
                  All in One Marketplace
                </span>

              </h1>

              <p className="mt-6 text-gray-300 text-base sm:text-lg leading-8 max-w-xl">
                Discover thousands of products from trusted sellers.
                Compare, shop and enjoy a seamless shopping experience
                with Vendora.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  to="/products"
                  className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3.5 rounded-xl font-semibold transition"
                >
                  Start Shopping
                  <FiArrowRight />
                </Link>

                <Link
                  to="/vendors"
                  className="border border-white/30 hover:bg-white hover:text-slate-900 px-6 py-3.5 rounded-xl font-semibold transition"
                >
                  Explore Vendors
                </Link>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 max-w-md gap-5 mt-10 pt-8 border-t border-white/10">

                <div>
                  <h3 className="text-2xl font-bold">
                    5K+
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Products
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    100+
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Vendors
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    10K+
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Customers
                  </p>
                </div>

              </div>

            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:flex justify-center">

              <div className="w-115 h-115 rounded-[40px] overflow-hidden shadow-2xl border border-white/10">

                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
                  alt="Vendora marketplace"
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="absolute top-10 -left-4 bg-white text-slate-900 rounded-2xl shadow-xl p-4 flex items-center gap-3">

                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <FiShoppingCart />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Today's Orders
                  </p>

                  <p className="font-bold">
                    1,250+
                  </p>
                </div>

              </div>

              <div className="absolute bottom-9 -right-4 bg-white text-slate-900 rounded-2xl shadow-xl p-4">

                <div className="flex items-center gap-1 text-yellow-500">

                  <FiStar fill="currentColor" />

                  <span className="text-slate-900 font-bold ml-1">
                    4.9
                  </span>

                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Customer Satisfaction
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20 bg-slate-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between gap-5 mb-9">

            <div>

              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                Explore
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
                Shop by Category
              </h2>

              <p className="text-gray-500 mt-3">
                Find exactly what you're looking for.
              </p>

            </div>

            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-indigo-600 font-semibold"
            >
              View All
              <FiArrowRight />
            </Link>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

            {categories.map((category) => (

              <Link
                to="/products"
                key={category.id}
                className={`${category.bg} rounded-2xl p-5 text-center border border-transparent hover:border-indigo-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
              >

                <div
                  className={`w-14 h-14 ${category.iconBg} rounded-2xl flex items-center justify-center mx-auto text-2xl`}
                >
                  {category.icon}
                </div>

                <h3 className="font-bold text-slate-900 mt-4">
                  {category.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {category.items}
                </p>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">

            <div>

              <p className="text-indigo-600 uppercase tracking-wider font-semibold text-sm">
                Handpicked for You
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
                Featured Products
              </h2>

              <p className="text-gray-500 mt-3">
                Explore some of our most loved products.
              </p>

            </div>

            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 font-semibold text-indigo-600"
            >
              View All Products
              <FiArrowRight />
            </Link>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {featuredProducts.map((product) => (

              <div
                key={product.id}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* Product Image */}
                <Link
                  to={`/products/${product.id}`}
                  className="block relative h-60 bg-gray-100 overflow-hidden"
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-white shadow-sm rounded-full text-xs font-semibold px-3 py-1.5">
                      {product.badge}
                    </span>
                  )}

                </Link>

                {/* Details */}
                <div className="p-5">

                  <div className="flex items-center justify-between gap-3">

                    <p className="text-xs font-medium text-indigo-600">
                      {product.category}
                    </p>

                    <span
                      className={`text-xs font-medium ${
                        product.stockCount <= 0
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

                    <h3 className="font-bold text-slate-900 mt-2 leading-6 min-h-12 hover:text-indigo-600 transition">
                      {product.name}
                    </h3>

                  </Link>

                  <Link
                    to={`/vendors/${product.vendorId}`}
                    className="text-sm text-gray-500 mt-2 inline-block"
                  >
                    by{" "}

                    <span className="font-medium text-slate-700 hover:text-indigo-600">
                      {product.vendor}
                    </span>

                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">

                    <div className="flex items-center gap-1 text-yellow-500">

                      <FiStar fill="currentColor" />

                      <span className="text-sm font-semibold text-slate-800">
                        {product.rating}
                      </span>

                    </div>

                    <span className="text-xs text-gray-400">
                      ({product.reviews} reviews)
                    </span>

                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-4">

                    <span className="text-xl font-bold text-slate-900">
                      ₹{product.price.toLocaleString()}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.oldPrice.toLocaleString()}
                    </span>

                  </div>

                  {/* Cart */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stockCount <= 0}
                    className={`mt-5 w-full rounded-xl py-3 font-medium flex items-center justify-center gap-2 transition ${
                      product.stockCount <= 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isInCart(product.id)
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-slate-900 hover:bg-indigo-600 text-white"
                    }`}
                  >

                    {product.stockCount <= 0 ? (
                      <>
                        <FiShoppingCart />
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

            ))}

          </div>

          <Link
            to="/products"
            className="sm:hidden mt-8 flex justify-center items-center gap-2 text-indigo-600 font-semibold"
          >
            View All Products
            <FiArrowRight />
          </Link>

        </div>

      </section>

      {/* Promotion */}
      <section className="pb-16 lg:pb-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-500 to-rose-500 text-white p-8 md:p-12">

            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10"></div>

            <div className="absolute right-32 -bottom-24 w-72 h-72 rounded-full bg-black/5"></div>

            <div className="relative max-w-2xl">

              <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold">
                Limited Time Offer
              </span>

              <h2 className="text-3xl md:text-5xl font-bold mt-5 leading-tight">
                Mega Shopping Sale
                <br />
                Up to 50% Off
              </h2>

              <p className="text-orange-50 mt-4 leading-7">
                Grab exciting offers from your favourite vendors
                before the deals disappear.
              </p>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 mt-7 bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition"
              >
                Shop Deals
                <FiArrowRight />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Top Vendors */}
      <section className="py-16 lg:py-20 bg-slate-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-11">

            <p className="text-indigo-600 text-sm uppercase tracking-wider font-semibold">
              Trusted Sellers
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Meet Our Top Vendors
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              Shop confidently from highly rated vendors delivering
              quality products and great service.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {topVendors.map((vendor) => (

              <div
                key={vendor.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
              >

                {/* Vendor Image */}
                <div className="h-44 overflow-hidden">

                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="p-6">

                  <div className="flex items-center gap-4">

                    <img
                      src={vendor.logo}
                      alt={vendor.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
                    />

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="text-lg font-bold text-slate-900">
                          {vendor.name}
                        </h3>

                        {vendor.verified && (
                          <FiCheckCircle className="text-blue-500" />
                        )}

                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        {vendor.category}
                      </p>

                    </div>

                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mt-6">

                    <div className="bg-slate-50 rounded-xl p-3">

                      <p className="text-xs text-gray-500">
                        Products
                      </p>

                      <p className="font-bold mt-1">
                        {vendor.products}
                      </p>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-3">

                      <p className="text-xs text-gray-500">
                        Rating
                      </p>

                      <div className="flex items-center gap-1 mt-1">

                        <FiStar
                          className="text-yellow-500"
                          fill="currentColor"
                        />

                        <span className="font-bold">
                          {vendor.rating}
                        </span>

                        <span className="text-xs text-gray-400">
                          ({vendor.reviews})
                        </span>

                      </div>

                    </div>

                  </div>

                  <Link
                    to={`/vendors/${vendor.id}`}
                    className="flex justify-center items-center gap-2 mt-5 w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl py-3 font-semibold transition"
                  >
                    Visit Store
                    <FiArrowRight />
                  </Link>

                </div>

              </div>

            ))}

          </div>

          <div className="text-center mt-9">

            <Link
              to="/vendors"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold"
            >
              Explore All Vendors
              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>

      {/* Benefits */}
      <section className="py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {benefits.map((benefit, index) => (

              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-2xl"
              >

                <div className="w-12 h-12 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                  {benefit.icon}
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-6 mt-1">
                    {benefit.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Final CTA */}
      <section className="bg-indigo-600">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-7">

            <div className="text-white">

              <h2 className="text-3xl font-bold">
                Ready to discover something amazing?
              </h2>

              <p className="text-indigo-100 mt-3">
                Thousands of products from trusted vendors are waiting
                for you.
              </p>

            </div>

            <Link
              to="/products"
              className="shrink-0 inline-flex justify-center items-center gap-2 bg-white text-indigo-600 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold transition"
            >
              Explore Marketplace
              <FiArrowRight />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;