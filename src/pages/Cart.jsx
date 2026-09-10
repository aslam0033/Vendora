import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiRefreshCcw,
  FiShield,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    subtotal,
    totalSavings,
    deliveryCharge,
    tax,
    grandTotal,
  } = useCart();

  const freeDeliveryTarget = 999;

  const amountRemainingForFreeDelivery = Math.max(
    0,
    freeDeliveryTarget - subtotal
  );

  const deliveryProgress =
    subtotal <= 0
      ? 0
      : Math.min(
          100,
          (subtotal / freeDeliveryTarget) * 100
        );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[75vh] bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white border border-gray-200 rounded-3xl p-8 md:p-10 text-center">

          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <FiShoppingBag className="text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-6">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 leading-7 mt-3">
            It looks like you haven't added anything yet. Explore the
            Vendora marketplace and discover products from trusted
            vendors.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-semibold mt-7 transition"
          >
            Start Shopping
            <FiArrowRight />
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          <p className="text-indigo-300 uppercase tracking-wider font-semibold text-sm">
            Your Shopping Cart
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Review Your Items
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl leading-7">
            Update quantities, remove products and review your order
            total before proceeding to checkout.
          </p>

        </div>

      </section>

      {/* Main Cart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            <FiArrowLeft />
            Continue Shopping
          </Link>

          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold"
          >
            <FiTrash2 />
            Clear Cart
          </button>

        </div>

        <div className="grid lg:grid-cols-[1fr_390px] gap-8 items-start">

          {/* Cart Items */}
          <div className="space-y-5">

            {/* Delivery Progress */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <FiTruck />
                </div>

                <div className="flex-1">

                  {amountRemainingForFreeDelivery > 0 ? (
                    <>
                      <p className="font-semibold text-slate-900">
                        Add ₹
                        {amountRemainingForFreeDelivery.toLocaleString()}{" "}
                        more for free delivery
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Free delivery is available on orders above
                        ₹999.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-green-600">
                        You've unlocked free delivery!
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        No delivery fee will be added to this order.
                      </p>
                    </>
                  )}

                  <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">

                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${deliveryProgress}%`,
                      }}
                    ></div>

                  </div>

                </div>

              </div>

            </div>

            {/* Cart Heading */}
            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">

              <div>
                <h2 className="font-bold text-lg text-slate-900">
                  Cart Items
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              <FiShoppingBag className="text-2xl text-indigo-600" />

            </div>

            {/* Items */}
            {cartItems.map((item) => {

              const itemTotal =
                item.price * item.quantity;

              const itemSavings =
                Math.max(
                  0,
                  (item.oldPrice || item.price) -
                    item.price
                ) * item.quantity;

              const reachedStockLimit =
                item.quantity >= item.stockCount;

              return (
                <article
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5"
                >

                  <div className="flex flex-col sm:flex-row gap-5">

                    {/* Image */}
                    <Link
                      to={`/products/${item.id}`}
                      className="w-full sm:w-40 h-52 sm:h-40 bg-slate-100 rounded-2xl overflow-hidden shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </Link>

                    {/* Information */}
                    <div className="flex-1 min-w-0">

                      <div className="flex justify-between gap-4">

                        <div>

                          <p className="text-xs font-semibold text-indigo-600">
                            {item.category}
                          </p>

                          <Link
                            to={`/products/${item.id}`}
                            className="block mt-2"
                          >
                            <h3 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition">
                              {item.name}
                            </h3>
                          </Link>

                          <p className="text-sm text-gray-500 mt-2">
                            Sold by{" "}

                            <Link
                              to={`/vendors/${item.vendorId}`}
                              className="font-medium text-slate-700 hover:text-indigo-600"
                            >
                              {item.vendor}
                            </Link>
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          aria-label={`Remove ${item.name}`}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center shrink-0 transition"
                        >
                          <FiTrash2 />
                        </button>

                      </div>

                      {/* Price */}
                      <div className="flex flex-wrap items-center gap-3 mt-5">

                        <span className="text-xl font-bold text-slate-900">
                          ₹{item.price.toLocaleString()}
                        </span>

                        {item.oldPrice > item.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{item.oldPrice.toLocaleString()}
                          </span>
                        )}

                        {item.oldPrice > item.price && (
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                            Save ₹
                            {(
                              item.oldPrice -
                              item.price
                            ).toLocaleString()}{" "}
                            each
                          </span>
                        )}

                      </div>

                      {/* Quantity and Total */}
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mt-6 pt-5 border-t border-gray-100">

                        <div>

                          <p className="text-xs text-gray-500 mb-2">
                            Quantity
                          </p>

                          <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              disabled={
                                item.quantity <= 1
                              }
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                            >
                              <FiMinus />
                            </button>

                            <span className="w-12 h-10 flex items-center justify-center border-x border-gray-300 font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }
                              disabled={
                                reachedStockLimit
                              }
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                            >
                              <FiPlus />
                            </button>

                          </div>

                          <p
                            className={`text-xs mt-2 ${
                              reachedStockLimit
                                ? "text-orange-500"
                                : "text-gray-500"
                            }`}
                          >
                            {reachedStockLimit
                              ? "Maximum available stock reached"
                              : `${item.stockCount} available`}
                          </p>

                        </div>

                        <div className="md:text-right">

                          <p className="text-xs text-gray-500">
                            Item Total
                          </p>

                          <p className="text-xl font-bold text-slate-900 mt-1">
                            ₹{itemTotal.toLocaleString()}
                          </p>

                          {itemSavings > 0 && (
                            <p className="text-xs text-green-600 mt-1">
                              You save ₹
                              {itemSavings.toLocaleString()}
                            </p>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-36">

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

              <div className="p-6 border-b border-gray-200">

                <h2 className="text-xl font-bold text-slate-900">
                  Order Summary
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Review your price details.
                </p>

              </div>

              <div className="p-6">

                <div className="space-y-4 text-sm">

                  <div className="flex justify-between gap-5 text-gray-600">
                    <span>
                      Subtotal ({totalItems}{" "}
                      {totalItems === 1
                        ? "item"
                        : "items"})
                    </span>

                    <span>
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between gap-5 text-green-600">
                      <span>Product Savings</span>

                      <span>
                        -₹
                        {totalSavings.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between gap-5 text-gray-600">

                    <span>Delivery Charge</span>

                    {deliveryCharge === 0 ? (
                      <span className="font-semibold text-green-600">
                        FREE
                      </span>
                    ) : (
                      <span>
                        ₹
                        {deliveryCharge.toLocaleString()}
                      </span>
                    )}

                  </div>

                  <div className="flex justify-between gap-5 text-gray-600">

                    <span>Estimated Tax</span>

                    <span>
                      ₹{tax.toLocaleString()}
                    </span>

                  </div>

                </div>

                <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between gap-5 items-center">

                  <div>
                    <p className="font-bold text-lg text-slate-900">
                      Total Amount
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Inclusive of estimated tax
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-slate-900">
                    ₹{grandTotal.toLocaleString()}
                  </span>

                </div>

                {totalSavings > 0 && (
                  <div className="mt-5 bg-green-50 border border-green-100 text-green-700 rounded-xl p-4 text-sm font-medium">
                    You are saving ₹
                    {totalSavings.toLocaleString()} on this order.
                  </div>
                )}

                <Link
                  to="/checkout"
                  className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                >
                  Proceed to Checkout
                  <FiArrowRight />
                </Link>

                <Link
                  to="/products"
                  className="w-full mt-3 border border-gray-300 hover:border-indigo-400 hover:text-indigo-600 text-slate-700 py-3.5 rounded-xl font-semibold flex items-center justify-center transition"
                >
                  Continue Shopping
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-5">
                  <FiShield className="text-green-600" />
                  Secure marketplace checkout
                </div>

              </div>

            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-5">

              <div className="bg-white border border-gray-200 rounded-2xl p-5">

                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <FiTruck />
                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-900">
                      Reliable Delivery
                    </h3>

                    <p className="text-xs text-gray-500 leading-5 mt-1">
                      Orders are fulfilled by trusted marketplace
                      vendors.
                    </p>

                  </div>

                </div>

              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">

                <div className="flex items-start gap-3">

                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <FiRefreshCcw />
                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-900">
                      Easy Shopping
                    </h3>

                    <p className="text-xs text-gray-500 leading-5 mt-1">
                      Update quantities or remove items before placing
                      your order.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </div>
  );
}

export default Cart;