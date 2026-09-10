import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiMapPin,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiUser,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";

import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalItems,
    subtotal,
    deliveryCharge,
    tax,
    grandTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "pincode") {
      newValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName =
        "Full name must contain at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    } else if (formData.address.trim().length < 10) {
      newErrors.address =
        "Please enter a complete delivery address.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode.";
    }

    if (!termsAccepted) {
      newErrors.terms =
        "Please accept the terms before placing your order.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateOrderId = () => {
    const random = Math.floor(
      100000 + Math.random() * 900000
    );

    return `VND-${Date.now()
      .toString()
      .slice(-6)}-${random}`;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    const orderData = {
      orderId: generateOrderId(),

      customer: {
        ...formData,
      },

      items: cartItems,

      paymentMethod,

      totalItems,

      subtotal,

      deliveryCharge,

      tax,

      grandTotal,

      status: "Confirmed",

      orderDate: new Date().toISOString(),
    };

    localStorage.setItem(
      "vendora-last-order",
      JSON.stringify(orderData)
    );

    clearCart();

    navigate("/order-success");
  };

  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
  }) => {
    return (
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
        </label>

        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full border rounded-xl px-4 py-3 outline-none transition ${
            errors[name]
              ? "border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          }`}
        />

        {errors[name] && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <FiAlertCircle />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

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

          <p className="text-gray-500 mt-3 leading-7">
            Add some products to your cart before proceeding to
            checkout.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-semibold mt-7 transition"
          >
            Explore Products
            <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-indigo-300 uppercase tracking-wider text-sm font-semibold">
            Secure Checkout
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Complete Your Order
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl leading-7">
            Enter your delivery details, review your products and
            choose your preferred payment method.
          </p>
        </div>
      </section>

      <form
        onSubmit={handlePlaceOrder}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-7"
        >
          <FiArrowLeft />
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-[1fr_390px] gap-8 items-start">
          {/* Left */}
          <div className="space-y-7">
            {/* Customer */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <FiUser className="text-xl" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Customer Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Enter the contact details for this order.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <InputField
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter your full name"
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                />

                <div className="md:col-span-2">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <FiMapPin className="text-xl" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Delivery Address
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Tell us where your order should be delivered.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    placeholder="House number, street, area, landmark..."
                    className={`w-full border rounded-xl px-4 py-3 outline-none resize-none transition ${
                      errors.address
                        ? "border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`}
                  ></textarea>

                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <FiAlertCircle />
                      {errors.address}
                    </p>
                  )}
                </div>

                <InputField
                  label="City"
                  name="city"
                  placeholder="Enter city"
                />

                <InputField
                  label="State"
                  name="state"
                  placeholder="Enter state"
                />

                <InputField
                  label="Pincode"
                  name="pincode"
                  placeholder="6-digit pincode"
                />

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Country
                  </label>

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="India">
                      India
                    </option>
                  </select>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <FiCreditCard className="text-xl" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Select your preferred payment option.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* COD */}
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("cod")
                  }
                  className={`w-full border rounded-2xl p-5 flex items-center justify-between gap-5 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        paymentMethod === "cod"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FaMoneyBillWave />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Cash on Delivery
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      paymentMethod === "cod"
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <FiCheck />
                    )}
                  </div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                  className={`w-full border rounded-2xl p-5 flex items-center justify-between gap-5 text-left transition ${
                    paymentMethod === "card"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        paymentMethod === "card"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FiCreditCard />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Credit / Debit Card
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Demo card-payment option.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      paymentMethod === "card"
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <FiCheck />
                    )}
                  </div>
                </button>

                {/* UPI */}
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("upi")
                  }
                  className={`w-full border rounded-2xl p-5 flex items-center justify-between gap-5 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                        paymentMethod === "upi"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      UPI
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        UPI Payment
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Demo UPI-payment option.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      paymentMethod === "upi"
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "upi" && (
                      <FiCheck />
                    )}
                  </div>
                </button>
              </div>

              {paymentMethod !== "cod" && (
                <div className="mt-5 bg-orange-50 border border-orange-100 rounded-xl p-4">
                  <p className="text-sm text-orange-700 leading-6">
                    Online payment is included for UI demonstration.
                    This frontend project does not process real payments.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-36">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <FiShoppingBag className="text-indigo-600 text-xl" />

                  <h2 className="text-xl font-bold text-slate-900">
                    Order Summary
                  </h2>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"}
                </p>
              </div>

              {/* Products */}
              <div className="p-6 max-h-96 overflow-y-auto space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >
                    <Link
                      to={`/products/${item.id}`}
                      className="relative w-20 h-20 shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full rounded-xl object-cover bg-slate-100"
                      />

                      <span className="absolute -top-2 -right-2 min-w-6 h-6 px-1 bg-slate-900 text-white rounded-full text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-indigo-600"
                      >
                        {item.name}
                      </Link>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.vendor}
                      </p>

                      <div className="flex items-center justify-between gap-3 mt-2">
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>

                        <p className="font-bold">
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="p-6 bg-slate-50 border-t border-gray-200">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>

                    <span>
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>

                    {deliveryCharge === 0 ? (
                      <span className="text-green-600 font-semibold">
                        FREE
                      </span>
                    ) : (
                      <span>
                        ₹
                        {deliveryCharge.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>

                    <span>
                      ₹{tax.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between items-center gap-5">
                  <div>
                    <p className="font-bold text-lg">
                      Total
                    </p>

                    <p className="text-xs text-gray-500">
                      Inclusive of taxes
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-slate-900">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(
                        e.target.checked
                      );

                      setErrors((prev) => ({
                        ...prev,
                        terms: "",
                      }));
                    }}
                    className="w-4 h-4 mt-1 accent-indigo-600"
                  />

                  <span className="text-xs text-gray-600 leading-5">
                    I confirm that the delivery information is correct
                    and agree to the marketplace terms and order
                    conditions.
                  </span>
                </label>

                {errors.terms && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    <FiAlertCircle />
                    {errors.terms}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold mt-6 transition"
                >
                  Confirm Order • ₹
                  {grandTotal.toLocaleString()}
                </button>

                <div className="flex justify-center items-center gap-2 text-xs text-gray-500 mt-4">
                  <FiShield className="text-green-600" />
                  Secure and protected checkout
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mt-5">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                  <FiTruck />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Delivery Information
                  </h3>

                  <p className="text-sm text-gray-500 leading-6 mt-1">
                    Estimated delivery is approximately 3–7 business
                    days depending on the seller's location.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}

export default Checkout;