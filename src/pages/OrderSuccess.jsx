import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTruck,
  FiUser,
  FiCreditCard,
  FiArrowRight,
} from "react-icons/fi";

function OrderSuccess() {
  const order = useMemo(() => {
    try {
      const savedOrder = localStorage.getItem("vendora-last-order");

      return savedOrder
        ? JSON.parse(savedOrder)
        : null;
    } catch (error) {
      console.error("Unable to load order:", error);
      return null;
    }
  }, []);

  const formatPaymentMethod = (method) => {
    if (method === "cod") {
      return "Cash on Delivery";
    }

    if (method === "card") {
      return "Credit / Debit Card";
    }

    if (method === "upi") {
      return "UPI Payment";
    }

    return "Payment Method";
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!order) {
    return (
      <div className="min-h-[75vh] bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white border border-gray-200 rounded-3xl p-8 md:p-10 text-center">

          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <FiShoppingBag className="text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-6">
            No Recent Order Found
          </h1>

          <p className="text-gray-500 leading-7 mt-3">
            You haven't placed an order yet. Explore Vendora and
            discover products from trusted marketplace sellers.
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

  const {
    orderId,
    customer,
    items = [],
    paymentMethod,
    totalItems,
    subtotal,
    deliveryCharge,
    tax,
    grandTotal,
    status,
    orderDate,
  } = order;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Success Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-indigo-800 text-white">

        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">

          <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20">
            <FiCheck className="text-4xl md:text-5xl" />
          </div>

          <p className="text-indigo-300 uppercase tracking-wider font-semibold text-sm mt-7">
            Order Confirmed
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Thank You for Your Order!
          </h1>

          <p className="text-gray-300 leading-7 mt-5 max-w-2xl mx-auto">
            Your order has been placed successfully. Your products are
            now being prepared by their respective Vendora vendors.
          </p>

          <div className="mt-8 inline-grid sm:grid-cols-3 bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden text-left">

            <div className="px-6 py-4">
              <p className="text-xs text-gray-400">
                Order Number
              </p>

              <p className="font-bold mt-1">
                {orderId}
              </p>
            </div>

            <div className="px-6 py-4 border-t sm:border-t-0 sm:border-l border-white/10">
              <p className="text-xs text-gray-400">
                Order Status
              </p>

              <p className="font-bold mt-1 text-green-300">
                {status || "Confirmed"}
              </p>
            </div>

            <div className="px-6 py-4 border-t sm:border-t-0 sm:border-l border-white/10">
              <p className="text-xs text-gray-400">
                Total Amount
              </p>

              <p className="font-bold mt-1">
                ₹{grandTotal.toLocaleString()}
              </p>
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-5">
            Ordered on {formatDate(orderDate)}
          </p>

        </div>

      </section>

      {/* Order Tracking */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="-mt-7 relative z-10 bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-8">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Order Status
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Track the progress of your order.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-7 mt-9">

            {/* Confirmed */}
            <div className="relative">

              <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-indigo-600"></div>

              <div className="relative z-10">

                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-xl" />
                </div>

                <h3 className="font-bold text-slate-900 mt-3">
                  Confirmed
                </h3>

                <p className="text-xs text-gray-500 mt-1 leading-5">
                  Your order has been received.
                </p>

              </div>

            </div>

            {/* Processing */}
            <div className="relative">

              <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-gray-200"></div>

              <div className="relative z-10">

                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                  <FiPackage className="text-xl" />
                </div>

                <h3 className="font-bold text-slate-900 mt-3">
                  Processing
                </h3>

                <p className="text-xs text-gray-500 mt-1 leading-5">
                  Vendors prepare your products.
                </p>

              </div>

            </div>

            {/* Shipped */}
            <div className="relative">

              <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-gray-200"></div>

              <div className="relative z-10">

                <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center">
                  <FiTruck className="text-xl" />
                </div>

                <h3 className="font-bold text-slate-900 mt-3">
                  Shipped
                </h3>

                <p className="text-xs text-gray-500 mt-1 leading-5">
                  Your products are on the way.
                </p>

              </div>

            </div>

            {/* Delivered */}
            <div>

              <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center">
                <FiHome className="text-xl" />
              </div>

              <h3 className="font-bold text-slate-900 mt-3">
                Delivered
              </h3>

              <p className="text-xs text-gray-500 mt-1 leading-5">
                Products reach your address.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Main Information */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid lg:grid-cols-3 gap-7">

          {/* Left */}
          <div className="lg:col-span-2 space-y-7">

            {/* Ordered Products */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

              <div className="p-6 border-b border-gray-200 flex items-center justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Items Ordered
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"} purchased
                  </p>
                </div>

                <FiShoppingBag className="text-2xl text-indigo-600" />

              </div>

              <div className="divide-y divide-gray-200">

                {items.map((item) => (

                  <div
                    key={item.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5"
                  >

                    <Link
                      to={`/products/${item.id}`}
                      className="w-full sm:w-28 h-44 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </Link>

                    <div className="flex-1">

                      <Link
                        to={`/products/${item.id}`}
                        className="font-bold text-slate-900 hover:text-indigo-600"
                      >
                        {item.name}
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

                      <div className="flex flex-wrap items-end justify-between gap-4 mt-4">

                        <div>
                          <p className="text-xs text-gray-500">
                            Quantity
                          </p>

                          <p className="font-semibold mt-1">
                            {item.quantity}
                          </p>
                        </div>

                        <div className="text-right">

                          <p className="text-xs text-gray-500">
                            Item Total
                          </p>

                          <p className="font-bold text-lg mt-1">
                            ₹
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Delivery Address */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                  <FiMapPin className="text-xl" />
                </div>

                <div>

                  <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                    Delivery Address
                  </p>

                  <h3 className="font-bold text-lg text-slate-900 mt-2">
                    {customer.fullName}
                  </h3>

                  <p className="text-sm text-gray-600 leading-6 mt-2">
                    {customer.address}
                    <br />
                    {customer.city}, {customer.state} - {customer.pincode}
                    <br />
                    {customer.country}
                  </p>

                  <p className="text-sm text-gray-500 mt-3">
                    Phone: {customer.phone}
                  </p>

                </div>

              </div>

            </div>

            {/* Delivery Estimate */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-white text-indigo-600 flex items-center justify-center shrink-0">
                  <FiTruck className="text-xl" />
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    Estimated Delivery
                  </h3>

                  <p className="text-sm text-gray-600 leading-6 mt-2">
                    Your order should arrive within approximately
                    <strong> 3–7 business days</strong>. Since Vendora
                    is a multi-vendor marketplace, individual products
                    may arrive in separate packages.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}
          <aside className="space-y-6">

            {/* Customer */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <FiUser className="text-indigo-600 text-xl" />

                <h2 className="text-lg font-bold text-slate-900">
                  Customer Details
                </h2>

              </div>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Full Name
                  </p>

                  <p className="text-sm font-semibold mt-1">
                    {customer.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Email Address
                  </p>

                  <p className="text-sm font-semibold mt-1 break-all">
                    {customer.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Phone Number
                  </p>

                  <p className="text-sm font-semibold mt-1">
                    {customer.phone}
                  </p>
                </div>

              </div>

            </div>

            {/* Payment */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <FiCreditCard className="text-indigo-600 text-xl" />

                <h2 className="text-lg font-bold text-slate-900">
                  Payment Details
                </h2>

              </div>

              <div className="bg-slate-50 rounded-xl p-4 mt-5">

                <p className="text-xs text-gray-500">
                  Payment Method
                </p>

                <p className="font-semibold text-sm mt-1">
                  {formatPaymentMethod(paymentMethod)}
                </p>

                {paymentMethod === "cod" ? (

                  <p className="text-xs text-orange-600 mt-3">
                    Payment will be collected at delivery.
                  </p>

                ) : (

                  <p className="text-xs text-green-600 mt-3 flex items-center gap-1">
                    <FiCheckCircle />
                    Demo payment confirmed
                  </p>

                )}

              </div>

            </div>

            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between gap-5 text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between gap-5 text-gray-600">
                  <span>Delivery</span>

                  {deliveryCharge === 0 ? (
                    <span className="font-semibold text-green-600">
                      FREE
                    </span>
                  ) : (
                    <span>
                      ₹{deliveryCharge.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex justify-between gap-5 text-gray-600">
                  <span>Estimated Tax</span>

                  <span>
                    ₹{tax.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between items-center gap-5">

                  <span className="font-bold text-slate-900">
                    Total
                  </span>

                  <span className="font-bold text-xl text-slate-900">
                    ₹{grandTotal.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

            {/* Order Time */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">

              <div className="flex gap-3">

                <FiClock className="text-indigo-600 text-xl shrink-0" />

                <div>
                  <p className="text-xs text-gray-500">
                    Order Placed
                  </p>

                  <p className="text-sm font-semibold mt-1">
                    {formatDate(orderDate)}
                  </p>
                </div>

              </div>

            </div>

          </aside>

        </div>

        {/* Actions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mt-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Continue Exploring Vendora
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Discover more products and trusted marketplace vendors.
              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <Link
                to="/"
                className="border border-gray-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-xl font-semibold text-center transition"
              >
                Back to Home
              </Link>

              <Link
                to="/products"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-center transition"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Final Confirmation */}
      <section className="bg-slate-950 text-white">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-9">

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">

            <FiCheckCircle className="text-green-400 text-2xl shrink-0" />

            <p className="text-gray-300">
              Order <strong className="text-white">{orderId}</strong>{" "}
              has been successfully confirmed with Vendora.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default OrderSuccess;