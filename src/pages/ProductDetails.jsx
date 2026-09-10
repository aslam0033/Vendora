import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiHeart,
  FiMinus,
  FiPlus,
  FiRefreshCcw,
  FiShield,
  FiShoppingCart,
  FiStar,
  FiTruck,
} from "react-icons/fi";

import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    isInCart,
  } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [selectedImage, setSelectedImage] =
    useState("");

  const [quantity, setQuantity] = useState(1);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(
        product.images?.[0] || product.image
      );

      setQuantity(1);
      setLiked(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white border border-gray-200 rounded-3xl p-8 text-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <FiShoppingCart className="text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-6">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-3 leading-7">
            The product you're looking for doesn't exist or is no
            longer available.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-semibold mt-7"
          >
            <FiArrowLeft />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  const maximumQuantity =
    product.stockCount || 0;

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      date: "18 Aug 2026",
      comment:
        "Excellent quality and very comfortable to use. The product looks premium and performs exactly as expected.",
    },
    {
      id: 2,
      name: "Neha Patil",
      rating: 4,
      date: "12 Aug 2026",
      comment:
        "Good value for money. Packaging was secure and delivery was quick.",
    },
    {
      id: 3,
      name: "Arjun Rao",
      rating: 5,
      date: "5 Aug 2026",
      comment:
        "Really satisfied with the purchase. I would definitely recommend this seller.",
    },
  ];

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(
        current + 1,
        maximumQuantity
      )
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const handleAddToCart = () => {
    if (product.stockCount <= 0) return;

    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (product.stockCount <= 0) return;

    addToCart(product, quantity);

    navigate("/cart");
  };

  return (
    <div className="bg-slate-50 min-h-screen">

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
              to="/products"
              className="hover:text-indigo-600"
            >
              Products
            </Link>

            <FiChevronRight />

            <span className="text-slate-800 font-medium">
              {product.category}
            </span>

            <FiChevronRight />

            <span className="text-slate-800 font-medium max-w-52 truncate">
              {product.name}
            </span>

          </div>

        </div>
      </div>

      {/* Main Product */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 mb-7"
        >
          <FiArrowLeft />
          Back to Products
        </Link>

        <div className="bg-white border border-gray-200 rounded-3xl p-5 md:p-8">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">

            {/* Gallery */}
            <div>

              <div className="relative bg-slate-100 rounded-2xl overflow-hidden aspect-square">

                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                  {discount}% OFF
                </span>

                <button
                  onClick={() =>
                    setLiked(!liked)
                  }
                  className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow transition ${
                    liked
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700 hover:text-red-500"
                  }`}
                >
                  <FiHeart
                    fill={
                      liked
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

                {product.images.map(
                  (image, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedImage(
                          image
                        )
                      }
                      className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                        selectedImage ===
                        image
                          ? "border-indigo-600"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}

              </div>
            </div>

            {/* Product Info */}
            <div>

              <span className="inline-block text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                {product.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 leading-tight">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex flex-wrap items-center gap-4 mt-4">

                <div className="flex items-center gap-1.5">

                  <FiStar
                    className="text-yellow-400"
                    fill="currentColor"
                  />

                  <span className="font-bold">
                    {product.rating}
                  </span>

                  <span className="text-sm text-gray-500">
                    ({product.reviews} reviews)
                  </span>

                </div>

                <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></span>

                <p className="text-sm text-gray-500">

                  Sold by{" "}

                  <Link
                    to={`/vendors/${product.vendorId}`}
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    {product.vendor}
                  </Link>

                </p>

              </div>

              {/* Price */}
              <div className="mt-7 pb-7 border-b border-gray-200">

                <div className="flex flex-wrap items-end gap-3">

                  <span className="text-4xl font-bold text-slate-900">
                    ₹
                    {product.price.toLocaleString()}
                  </span>

                  <span className="text-lg text-gray-400 line-through mb-1">
                    ₹
                    {product.oldPrice.toLocaleString()}
                  </span>

                  <span className="text-green-600 font-semibold mb-1">
                    Save ₹
                    {(
                      product.oldPrice -
                      product.price
                    ).toLocaleString()}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Inclusive of all taxes
                </p>

              </div>

              {/* Description */}
              <div className="py-7 border-b border-gray-200">

                <h2 className="font-bold text-lg text-slate-900">
                  About this product
                </h2>

                <p className="text-gray-600 leading-7 mt-3">
                  {product.description}
                </p>

                <ul className="space-y-3 mt-5">

                  <li className="flex gap-2 items-center text-sm text-gray-600">
                    <FiCheck className="text-green-600 shrink-0" />
                    Premium quality product
                  </li>

                  <li className="flex gap-2 items-center text-sm text-gray-600">
                    <FiCheck className="text-green-600 shrink-0" />
                    Sold by a trusted marketplace vendor
                  </li>

                  <li className="flex gap-2 items-center text-sm text-gray-600">
                    <FiCheck className="text-green-600 shrink-0" />
                    Secure packaging and reliable delivery
                  </li>

                </ul>

              </div>

              {/* Stock */}
              <div className="pt-7">

                <div className="flex items-center gap-2">

                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      product.stockCount > 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>

                  <span
                    className={`font-semibold ${
                      product.stockCount > 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {product.stock}
                  </span>

                </div>

                {product.stockCount > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    {product.stockCount} units currently available
                  </p>
                )}

                {/* Quantity */}
                {product.stockCount > 0 && (
                  <div className="mt-5">

                    <p className="font-semibold text-slate-900 mb-3">
                      Quantity
                    </p>

                    <div className="inline-flex border border-gray-300 rounded-xl overflow-hidden">

                      <button
                        onClick={
                          decreaseQuantity
                        }
                        disabled={
                          quantity <= 1
                        }
                        className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                      >
                        <FiMinus />
                      </button>

                      <div className="w-12 h-11 flex items-center justify-center font-semibold border-x border-gray-300">
                        {quantity}
                      </div>

                      <button
                        onClick={
                          increaseQuantity
                        }
                        disabled={
                          quantity >=
                          product.stockCount
                        }
                        className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                      >
                        <FiPlus />
                      </button>

                    </div>

                  </div>
                )}

                {/* Actions */}
                <div className="grid sm:grid-cols-2 gap-3 mt-7">

                  <button
                    onClick={
                      handleAddToCart
                    }
                    disabled={
                      product.stockCount <= 0
                    }
                    className={`py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                      product.stockCount <= 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isInCart(
                            product.id
                          )
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-slate-900 hover:bg-indigo-600 text-white"
                    }`}
                  >
                    {product.stockCount <=
                    0 ? (
                      <>
                        <FiShoppingCart />
                        Out of Stock
                      </>
                    ) : isInCart(
                        product.id
                      ) ? (
                      <>
                        <FiCheckCircle />
                        Add More
                      </>
                    ) : (
                      <>
                        <FiShoppingCart />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={
                      handleBuyNow
                    }
                    disabled={
                      product.stockCount <= 0
                    }
                    className={`py-4 rounded-xl font-semibold transition ${
                      product.stockCount <= 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    Buy Now
                  </button>

                </div>

              </div>

              {/* Benefits */}
              <div className="grid sm:grid-cols-3 gap-3 mt-7">

                <div className="bg-slate-50 rounded-xl p-4">
                  <FiTruck className="text-xl text-indigo-600" />

                  <p className="text-sm font-semibold mt-2">
                    Fast Delivery
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Reliable shipping
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <FiRefreshCcw className="text-xl text-indigo-600" />

                  <p className="text-sm font-semibold mt-2">
                    Easy Returns
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Hassle-free returns
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <FiShield className="text-xl text-indigo-600" />

                  <p className="text-sm font-semibold mt-2">
                    Secure Purchase
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Protected checkout
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Specifications + Vendor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        <div className="grid lg:grid-cols-3 gap-7">

          {/* Specifications */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

            <p className="text-indigo-600 uppercase tracking-wider font-semibold text-sm">
              Product Information
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Product Specifications
            </h2>

            <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden">

              {Object.entries(
                product.specifications
              ).map(
                (
                  [key, value],
                  index
                ) => (
                  <div
                    key={key}
                    className={`grid grid-cols-2 gap-4 p-4 ${
                      index % 2 === 0
                        ? "bg-slate-50"
                        : "bg-white"
                    }`}
                  >
                    <span className="text-gray-500 text-sm">
                      {key}
                    </span>

                    <span className="text-slate-900 font-medium text-sm">
                      {value}
                    </span>
                  </div>
                )
              )}

            </div>

          </div>

          {/* Vendor Info */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wider">
              Seller Information
            </p>

            <div className="flex items-center gap-4 mt-5">

              <div className="w-14 h-14 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                {product.vendor.charAt(0)}
              </div>

              <div>

                <Link
                  to={`/vendors/${product.vendorId}`}
                  className="font-bold text-lg text-slate-900 hover:text-indigo-600"
                >
                  {product.vendor}
                </Link>

                <div className="flex items-center gap-1 mt-1">

                  <FiStar
                    className="text-yellow-400"
                    fill="currentColor"
                  />

                  <span className="font-semibold text-sm">
                    4.8
                  </span>

                  <span className="text-xs text-gray-400">
                    seller rating
                  </span>

                </div>

              </div>

            </div>

            <p className="text-sm text-gray-500 leading-6 mt-5">
              Trusted Vendora marketplace vendor
              offering quality products, reliable
              service and secure fulfilment.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5">

              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">
                  Product Rating
                </p>

                <p className="font-bold mt-1">
                  {product.rating}/5
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">
                  Reviews
                </p>

                <p className="font-bold mt-1">
                  {product.reviews}
                </p>
              </div>

            </div>

            <Link
              to={`/vendors/${product.vendorId}`}
              className="mt-5 w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-3 rounded-xl font-semibold flex items-center justify-center transition"
            >
              Visit Vendor Store
            </Link>

          </div>

        </div>

      </section>

      {/* Reviews */}
      <section className="bg-white border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">

            <div>

              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                Customer Feedback
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                Ratings & Reviews
              </h2>

            </div>

            <div className="flex items-center gap-4">

              <span className="text-4xl font-bold">
                {product.rating}
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

                <p className="text-sm text-gray-500 mt-1">
                  Based on {product.reviews} reviews
                </p>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-9">

            {reviews.map((review) => (

              <div
                key={review.id}
                className="border border-gray-200 rounded-2xl p-6"
              >

                <div className="flex justify-between gap-3">

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {review.name}
                    </h3>

                    <p className="text-xs text-green-600 mt-1">
                      Verified Purchase
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">
                    {review.date}
                  </span>

                </div>

                <div className="flex gap-1 mt-4">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FiStar
                        key={star}
                        className={
                          star <=
                          review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        fill={
                          star <=
                          review.rating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    )
                  )}

                </div>

                <p className="text-sm text-gray-600 leading-6 mt-4">
                  {review.comment}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="bg-indigo-600 text-white rounded-3xl px-6 md:px-10 py-8 flex flex-col md:flex-row gap-6 justify-between md:items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Keep exploring the marketplace
            </h2>

            <p className="text-indigo-100 mt-2">
              Discover more products from trusted
              Vendora sellers.
            </p>
          </div>

          <Link
            to="/products"
            className="bg-white text-indigo-600 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold text-center shrink-0"
          >
            Browse Products
          </Link>

        </div>

      </section>

    </div>
  );
}

export default ProductDetails;