import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTruck,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
  ];

  return (
    <footer className="bg-slate-950 text-gray-300">

      {/* Footer Benefits */}
      <section className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center shrink-0">
                <FiTruck className="text-xl" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Fast Delivery
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Reliable shipping across India
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center shrink-0">
                <FiShield className="text-xl" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Secure Shopping
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Safe and protected checkout
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center shrink-0">
                <span className="font-bold text-lg">
                  ₹
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Great Value
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Competitive marketplace pricing
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center shrink-0">
                <FiMail className="text-xl" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Customer Support
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Help whenever you need it
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Main Footer */}
      <section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Brand */}
            <div>

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >

                <div className="w-11 h-11 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                  V
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white leading-none">
                    Vendora
                  </h2>

                  <p className="text-[10px] text-gray-500 mt-1">
                    Shop. Discover. Connect.
                  </p>
                </div>

              </Link>

              <p className="text-sm text-gray-400 leading-7 mt-5">
                Vendora is a modern multi-vendor marketplace where
                customers can discover products from trusted sellers
                across multiple categories.
              </p>

              {/* Social */}
              <div className="flex items-center gap-3 mt-6">

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-indigo-600 text-gray-300 hover:text-white flex items-center justify-center transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-indigo-600 text-gray-300 hover:text-white flex items-center justify-center transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-indigo-600 text-gray-300 hover:text-white flex items-center justify-center transition"
                >
                  <FaTwitter />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-indigo-600 text-gray-300 hover:text-white flex items-center justify-center transition"
                >
                  <FaLinkedinIn />
                </a>

              </div>

            </div>

            {/* Quick Links */}
            <div>

              <h3 className="text-white font-bold text-lg">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 mt-5 text-sm">

                <Link
                  to="/"
                  className="hover:text-indigo-300 transition"
                >
                  Home
                </Link>

                <Link
                  to="/products"
                  className="hover:text-indigo-300 transition"
                >
                  All Products
                </Link>

                <Link
                  to="/vendors"
                  className="hover:text-indigo-300 transition"
                >
                  Vendors
                </Link>

                <Link
                  to="/cart"
                  className="hover:text-indigo-300 transition"
                >
                  Shopping Cart
                </Link>

                <Link
                  to="/checkout"
                  className="hover:text-indigo-300 transition"
                >
                  Checkout
                </Link>

              </div>

            </div>

            {/* Categories */}
            <div>

              <h3 className="text-white font-bold text-lg">
                Categories
              </h3>

              <div className="flex flex-col gap-3 mt-5 text-sm">

                {categories.map((category) => (

                  <Link
                    key={category}
                    to={`/products?category=${encodeURIComponent(
                      category
                    )}`}
                    className="hover:text-indigo-300 transition"
                  >
                    {category}
                  </Link>

                ))}

              </div>

            </div>

            {/* Contact */}
            <div>

              <h3 className="text-white font-bold text-lg">
                Contact Vendora
              </h3>

              <div className="space-y-5 mt-5">

                <div className="flex items-start gap-3">

                  <FiMapPin className="text-indigo-300 mt-1 shrink-0" />

                  <div>
                    <p className="text-sm text-gray-400 leading-6">
                      Bengaluru, Karnataka
                      <br />
                      India
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <FiPhone className="text-indigo-300 shrink-0" />

                  <a
                    href="tel:+919876543210"
                    className="text-sm text-gray-400 hover:text-indigo-300 transition"
                  >
                    +91 98765 43210
                  </a>

                </div>

                <div className="flex items-center gap-3">

                  <FiMail className="text-indigo-300 shrink-0" />

                  <a
                    href="mailto:support@vendora.com"
                    className="text-sm text-gray-400 hover:text-indigo-300 transition break-all"
                  >
                    support@vendora.com
                  </a>

                </div>

              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-semibold text-sm mt-6"
              >
                Start Shopping
                <FiArrowRight />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Bottom Footer */}
      <section className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

            <p className="text-xs sm:text-sm text-gray-500">
              © {currentYear} Vendora. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500">

              <span className="hover:text-gray-300 cursor-pointer transition">
                Privacy Policy
              </span>

              <span className="hover:text-gray-300 cursor-pointer transition">
                Terms & Conditions
              </span>

              <span className="hover:text-gray-300 cursor-pointer transition">
                Shipping Policy
              </span>

            </div>

          </div>

        </div>

      </section>

    </footer>
  );
}

export default Footer;